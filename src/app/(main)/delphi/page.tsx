"use client";

import { FireBird, FireBirdsColumns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { listfirebird } from "@/lib/api/firebird";

export default function Page() {
  const { data, isError, error, isPending } = listfirebird({
    params: {},
  });

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError && error) {
    return <div>Error: {error.message}</div>;
  }
  const fireBirds: FireBird[] = data?.data || [];
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Firebird List</h1>
      <DataTable columns={FireBirdsColumns} data={fireBirds} />
    </div>
  );
}
