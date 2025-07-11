"use client";
import { MyPayments, MyPaymentsColumns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorDisplay from "@/components/ErrorDisplay";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { useQueryState } from "nuqs";
import { getMyPayments } from "@/lib/api/payments";

export default function page() {
  const [status, setStatus] = useQueryState("status", {
    defaultValue: "",
  });
  
  const { data, error, isError, isPending, isSuccess } = getMyPayments({
    params: status ? { status } : {},
  });
  
  if (isPending) {
    return <LoadingSpinner fullScreen message="Loading your payments..." />;
  }
  
  if (isError && error) {
    return (
      <ErrorDisplay
        title="Failed to Load Payments"
        message="We couldn't load your payment history. Please try again."
        error={error as Error}
        onRetry={() => window.location.reload()}
        size="md"
      />
    );
  }
  
  if (isSuccess && !data) {
    return (
      <ErrorDisplay
        title="No Payment Data"
        message="You haven't made any payments yet."
        showRetry={false}
        size="md"
      />
    );
  }
  
  const payments: MyPayments[] = data?.data || [];
  
  return (
    <div className="p-4 sm:p-6">
      {/* Header Section - Responsive */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">My Payments</h1>
      </div>
      
      {/* Data Table Section - Responsive */}
      {payments.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-sm sm:text-base">
            No payment history found.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <DataTable columns={MyPaymentsColumns} data={payments} />
        </div>
      )}
    </div>
  );
}
