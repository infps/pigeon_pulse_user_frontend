"use client";

import {
  FireBirdEventInventory,
  FireBirdEventInventoryColumns,
} from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { listFirebirdEventInventory } from "@/lib/api/firebird";

export default function RaceResultsPage() {
  const { data, error, isError, isPending, isSuccess } =
    listFirebirdEventInventory();
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error?.message || "An error occurred"}</div>;
  }
  const eventInventory: FireBirdEventInventory[] = data?.data || [];
  return (
    <div className=" mx-auto py-10 px-10">
      <h1 className="text-3xl font-bold text-center my-5">Event Inventory</h1>
      <DataTable
        columns={FireBirdEventInventoryColumns}
        data={eventInventory}
      />
    </div>
  );
}
