"use client";

import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCreatePaymentOrder, useCapturePayment } from "@/lib/api/payment";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface PaymentPaypalButtonProps {
  paymentId: string;
}

export function PaymentPaypalButton({ paymentId }: PaymentPaypalButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync: createOrderMutateAsync, isPending: createOrderPending } =
    useCreatePaymentOrder(paymentId);
  const {
    mutateAsync: capturePaymentMutateAsync,
    isPending: capturePaymentPending,
  } = useCapturePayment();

  // Validate PayPal client ID
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  if (!clientId) {
    return (
      <div className="text-center p-2 bg-red-50 border border-red-200 rounded">
        <p className="text-red-600 text-xs">Payment system unavailable</p>
      </div>
    );
  }

  const initialOptions = {
    clientId,
    currency: "USD",
    intent: "capture",
  };

  async function onCreateOrder(): Promise<string> {
    try {
      setIsProcessing(true);

      if (!createOrderMutateAsync) {
        throw new Error("Payment service unavailable");
      }

      const { data, error } = await createOrderMutateAsync({});

      if (error) {
        toast.error(error);
        throw new Error("Failed to create order: " + error);
      }

      const orderId: string = data?.data?.orderId;
      if (!orderId) {
        throw new Error("No order ID received");
      }

      toast.info("Order created successfully");
      return orderId;
    } catch (error: any) {
      console.error("Error creating order:", error);
      toast.error(error.message || "Failed to create order");
      setIsProcessing(false);
      throw error;
    }
  }

  async function onApprove(data: any) {
    try {
      console.log("PayPal approval data:", data);

      if (!data.orderID) {
        throw new Error("No order ID provided by PayPal");
      }

      const { orderID } = data;
      toast.info("Processing payment...");

      if (!capturePaymentMutateAsync) {
        throw new Error("Payment capture service unavailable");
      }

      const { data: captureData, error } = await capturePaymentMutateAsync({
        orderId: orderID,
      });

      if (error) {
        console.error("Error capturing payment:", error);
        throw new Error("Payment capture failed: " + error);
      }

      console.log("Payment captured successfully:", captureData);
      toast.success("Payment successful!");

      // Invalidate payments query to refresh the table
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    } catch (error: any) {
      console.error("Error during payment capture:", error);
      toast.error(error.message || "Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }

  async function onError(error: any) {
    console.error("PayPal Button Error:", error);
    setIsProcessing(false);

    let errorMessage = "Payment failed. Please try again.";

    if (error?.message) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    toast.error(errorMessage);
  }

  function onCancel(data: any) {
    console.log("PayPal payment cancelled:", data);
    setIsProcessing(false);
    toast.info("Payment cancelled");
  }

  const isDisabled = isProcessing || createOrderPending || capturePaymentPending;

  return (
    <div className="inline-block">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            layout: "horizontal",
            color: "blue",
            shape: "rect",
            height: 30,
            label: "pay",
          }}
          createOrder={onCreateOrder}
          onApprove={onApprove}
          onError={onError}
          onCancel={onCancel}
          fundingSource="paypal"
          disabled={isDisabled}
        />
      </PayPalScriptProvider>
    </div>
  );
}
