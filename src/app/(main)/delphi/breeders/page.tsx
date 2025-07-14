"use client";

import {
  FireBirdBreeder,
  FireBirdBreedersColumns,
} from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { listFirebirdBreeders } from "@/lib/api/firebird";

export default function RaceResultsPage() {
  const { data, error, isError, isPending, isSuccess } =
    listFirebirdBreeders();
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error?.message || "An error occurred"}</div>;
  }
  const breedersResult: FireBirdBreeder[] = data?.data || [];
  return (
    <div className=" mx-auto py-10 px-10">
      <h1 className="text-3xl font-bold text-center my-5">Breeders</h1>
      <DataTable columns={FireBirdBreedersColumns} data={breedersResult} />
    </div>
  );
}
