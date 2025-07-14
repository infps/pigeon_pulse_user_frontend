"use client";

import {
  FireBirdRaceResult,
  FireBirdRaceResultsColumns,
} from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { listFirebirdRaceResults } from "@/lib/api/firebird";

export default function RaceResultsPage() {
  const { data, error, isError, isPending, isSuccess } =
    listFirebirdRaceResults();
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error?.message || "An error occurred"}</div>;
  }
  const raceResults: FireBirdRaceResult[] = data?.data || [];
  return (
    <div className="max-w-7xl mx-auto py-10 px-10">
      <h1 className="text-3xl font-bold text-center my-5">Race Results</h1>
      <DataTable columns={FireBirdRaceResultsColumns} data={raceResults} />
    </div>
  );
}
