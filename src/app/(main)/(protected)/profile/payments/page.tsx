"use client";
import { MyEventsColumns, MyPaymentsColumns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { useGetMyEvents } from "@/lib/api/eventInventory";
import { useGetMyPayments } from "@/lib/api/payment";
import { MyEvents, MyPayments } from "@/lib/types";

export default function MyPaymentsPage() {
  const { data, error, isError, isPending } = useGetMyPayments();
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  const myPayments: MyPayments[] = data?.data || [];
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Payments</h1>
      <DataTable columns={MyPaymentsColumns} data={myPayments} />
    </div>
  );
}
