"use client";

import { AuthProvider } from "@/app/auth-provider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useListBirds } from "@/lib/api/bird";
import { useGetEventById } from "@/lib/api/event";
import { useCreateEventInventory } from "@/lib/api/eventInventory";
import { useCapturePayment } from "@/lib/api/payment";
import { Bird, Event } from "@/lib/types";
import { useAuthStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function page({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = use(params);
  return (
    <AuthProvider requireAuth={true}>
      <RegisterForm eventId={eventId} />
    </AuthProvider>
  );
}

function RegisterForm({ eventId }: { eventId: string }) {
  const [selectedBirds, setSelectedBirds] = useState<Bird[]>([]);
  const { data, isError, error, isPending } = useGetEventById(eventId);
  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  const event: Event = data?.data;
  if (event.status !== "OPEN") {
    return (
      <div className="h-40 flex items-center justify-center">
        Event is not open for registration
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-white to-primary h-48 flex items-center px-4 sm:px-6 lg:px-10 sm:h-64 lg:h-96 relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-5xl font-semibold tracking-wider uppercase leading-tight">
            Chasing the sky one feather at a time
          </h1>
        </div>
      </div>
      <CountDown event={event} />
      <div className="bg-gradient-to-r from-primary to-white text-center">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 py-4 text-white px-4">
          {event.name}
        </h1>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <OwnerInformation />
        <BirdInformation
          selectedBirds={selectedBirds}
          setSelectedBirds={setSelectedBirds}
        />
        {selectedBirds.length > 0 && (
          <PaymentInformation event={event} selectedBirds={selectedBirds} />
        )}
      </div>
    </div>
  );
}

function PaymentInformation({
  event,
  selectedBirds,
}: {
  event: Event;
  selectedBirds: Bird[];
}) {
  const totalAmount = event.feeSchema.entryFee * selectedBirds.length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full border-t bg-gray-50">
      <h2 className="font-bold text-secondary mb-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
        Payment Information
      </h2>

      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600 text-sm sm:text-base">
              Entry Fee per Bird:
            </span>
            <span className="font-medium text-sm sm:text-base">
              ${event.feeSchema.entryFee.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600 text-sm sm:text-base">
              Number of Birds:
            </span>
            <span className="font-medium text-sm sm:text-base">
              {selectedBirds.length}
            </span>
          </div>
          <div className="flex justify-between items-center py-3 border-b-2 border-secondary">
            <span className="text-base sm:text-lg font-semibold text-secondary">
              Total Amount:
            </span>
            <span className="text-lg sm:text-xl font-bold text-secondary">
              ${totalAmount.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-gray-700 mb-3 text-sm sm:text-base">
            Registered Birds:
          </h4>
          <div className="max-h-48 overflow-y-auto space-y-2">
            {selectedBirds.map((bird, index) => (
              <div
                key={bird.id}
                className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded text-sm"
              >
                <span className="flex-1 truncate">
                  {index + 1}. {bird.birdName} - ({bird.color})
                </span>
                <span className="font-medium text-green-600 ml-2">
                  ${event.feeSchema.entryFee.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex w-full justify-center">
          <div className="w-full max-w-md">
            <PaypalButton eventId={event.id} selectedBirds={selectedBirds} />
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Secure payment processing • All payments are encrypted and secure
          </p>
        </div>
      </div>
    </div>
  );
}

function BirdInformation({
  selectedBirds,
  setSelectedBirds,
}: {
  selectedBirds: Bird[];
  setSelectedBirds: (birds: Bird[]) => void;
}) {
  const { data } = useListBirds();
  const birds: Bird[] = data?.data || [];

  const handleAddBird = (bird: Bird) => {
    if (!selectedBirds.find((b) => b.id === bird.id)) {
      setSelectedBirds([...selectedBirds, bird]);
      toast.success(`${bird.birdName} added to registration`);
    } else {
      toast.info(`${bird.birdName} is already selected`);
    }
  };

  const handleRemoveBird = (birdId: string) => {
    const bird = selectedBirds.find((b) => b.id === birdId);
    setSelectedBirds(selectedBirds.filter((bird) => bird.id !== birdId));
    if (bird) {
      toast.success(`${bird.birdName} removed from registration`);
    }
  };

  const handleClearAll = () => {
    setSelectedBirds([]);
    toast.success("All birds removed from registration");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full border-b">
      <h2 className="font-bold text-secondary mb-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
        Bird Information
      </h2>

      {/* Available Birds Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Select Birds to Register</h3>
        {birds.length === 0 ? (
          <p className="text-gray-500">
            No birds available. Please add birds to your account first.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {birds.map((bird) => {
              const isSelected = selectedBirds.find((b) => b.id === bird.id);
              return (
                <div
                  key={bird.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-primary/50"
                  }`}
                  onClick={() => handleAddBird(bird)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {bird.birdName}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Color: {bird.color}
                      </p>
                      <p className="text-sm text-gray-600">Sex: {bird.sex}</p>
                    </div>
                    {isSelected && (
                      <div className="text-primary text-sm font-medium">
                        ✓ Selected
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Selected Birds Section */}
      {selectedBirds.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              Selected Birds ({selectedBirds.length})
            </h3>
            <button
              onClick={handleClearAll}
              className="text-red-600 hover:text-red-800 text-sm font-medium px-3 py-1 border border-red-200 rounded hover:bg-red-50 transition-colors"
            >
              Clear All
            </button>
          </div>
          <div className="space-y-3">
            {selectedBirds.map((bird) => (
              <div
                key={bird.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{bird.birdName}</h4>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span>Color: {bird.color}</span>
                    <span>Sex: {bird.sex}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveBird(bird.id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium px-3 py-1 border border-red-200 rounded hover:bg-red-50 transition-colors ml-4"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function OwnerInformation() {
  const { user } = useAuthStore();

  return (
    <div className="p-4 sm:p-6 lg:p-8 xl:p-10 w-full border-b">
      <h2 className="font-bold text-secondary mb-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
        Owner Information
      </h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label className="text-sm font-medium">Name</Label>
          <Input
            value={user?.name || ""}
            className="mt-2 h-10 sm:h-12 shadow-none"
            readOnly
            disabled
          />
        </div>
        <div>
          <Label className="text-sm font-medium">Email</Label>
          <Input
            value={user?.email || ""}
            className="mt-2 h-10 sm:h-12 shadow-none"
            readOnly
            disabled
          />
        </div>
      </div>
    </div>
  );
}

function CountDown({ event }: { event: Event }) {
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    if (!event?.date) return;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const eventTime = new Date(event.date).getTime();
      const difference = eventTime - now;

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeRemaining({ hours, minutes, seconds });
      } else {
        setTimeRemaining({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [event?.date]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 p-4 sm:p-6 lg:p-8 xl:p-10">
      <div className="border-r px-2 sm:px-4 lg:px-10 text-center">
        <p className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4">
          {event._count.EventInventoryItem}
        </p>
        <p className="text-xs sm:text-sm text-gray-600">Total Registrations</p>
      </div>
      <div className="border-r px-2 sm:px-4 lg:px-10 text-center">
        <p className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4">
          {timeRemaining.hours}
        </p>
        <p className="text-xs sm:text-sm text-gray-600">Hours</p>
      </div>
      <div className="border-r px-2 sm:px-4 lg:px-10 text-center">
        <p className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4">
          {timeRemaining.minutes}
        </p>
        <p className="text-xs sm:text-sm text-gray-600">Minutes</p>
      </div>
      <div className="px-2 sm:px-4 lg:px-10 text-center">
        <p className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4">
          {timeRemaining.seconds}
        </p>
        <p className="text-xs sm:text-sm text-gray-600">Seconds</p>
      </div>
    </div>
  );
}

function PaypalButton({
  eventId,
  selectedBirds,
}: {
  eventId: string;
  selectedBirds: Bird[];
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const {
    mutateAsync: RegisterEventMutateAsync,
    isPending: RegisterEventPending,
  } = useCreateEventInventory();
  const {
    mutateAsync: CapturePaymentMutateAsync,
    isPending: CapturePaymentPending,
  } = useCapturePayment();
  const router = useRouter();

  // Validate PayPal client ID
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  if (!clientId) {
    return (
      <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600 text-sm">
          Payment system is temporarily unavailable
        </p>
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

      if (!RegisterEventMutateAsync) {
        throw new Error("Registration service unavailable");
      }

      if (selectedBirds.length === 0) {
        throw new Error("No birds selected for registration");
      }

      const birds: string[] = selectedBirds.map((bird) => bird.id);
      const { data, error } = await RegisterEventMutateAsync({
        birds,
        eventId,
      });

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

      if (!CapturePaymentMutateAsync) {
        throw new Error("Payment capture service unavailable");
      }

      const { data: captureData, error } = await CapturePaymentMutateAsync({
        orderId: orderID,
      });

      if (error) {
        console.error("Error capturing payment:", error);
        // toast.error(error);
        throw new Error("Payment capture failed: " + error);
      }

      console.log("Payment captured successfully:", captureData);
      toast.success("Payment successful! Registration complete.");

      // Successful payment - redirect to appropriate page
      setTimeout(() => {
        router.push(`/profile/my-events`);
      }, 2000);
    } catch (error: any) {
      console.error("Error during payment capture:", error);
      // toast.error(error.message || "Payment failed. Please try again.");
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

  const isDisabled =
    isProcessing || RegisterEventPending || CapturePaymentPending;

  return (
    <div className="w-full">
      {isDisabled && (
        <div className="mb-4 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <div className="animate-spin rounded-full h-3 w-3 border-b border-blue-600 mr-2"></div>
            {RegisterEventPending
              ? "Creating order..."
              : CapturePaymentPending
              ? "Processing payment..."
              : "Processing..."}
          </div>
        </div>
      )}

      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            layout: "vertical",
            color: "blue",
            shape: "rect",
            height: 45,
          }}
          createOrder={onCreateOrder}
          onApprove={onApprove}
          onError={onError}
          onCancel={onCancel}
          fundingSource="paypal"
          disabled={isDisabled}
        />
      </PayPalScriptProvider>

      <div className="mt-3 text-center">
        <p className="text-xs text-gray-500">
          You will be redirected to your race registrations after successful
          payment
        </p>
      </div>
    </div>
  );
}
