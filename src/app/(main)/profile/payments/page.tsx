"use client";
import { MyPayments, MyPaymentsColumns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
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
    return <div>Loading...</div>;
  }
  if (isError && error) {
    return <div>Error: {error.message}</div>;
  }
  if (isSuccess && !data) {
    return <div>Data not found</div>;
  }
  const payments: MyPayments[] = data?.data;
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">My Payments</h1>
      </div>
      <DataTable columns={MyPaymentsColumns} data={payments} />
    </>
  );
}
