"use client";
import { MyEventsColumns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { useGetMyEvents } from "@/lib/api/eventInventory";
import { MyEvents } from "@/lib/types";

export default function MyEventsPage() {
  const { data, error, isError, isPending } = useGetMyEvents();
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  const myEvents: MyEvents[] = data?.data || [];
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Events</h1>
      <DataTable columns={MyEventsColumns} data={myEvents} />
    </div>
  );
}
