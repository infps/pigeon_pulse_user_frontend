"use client";
import { MyRaces, MyRacesColumns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getMyRaces } from "@/lib/api/race";
import React from "react";
import { useQueryState } from "nuqs";
export default function page() {
  const [status, setStatus] = useQueryState("status", {
    defaultValue: "",
  });
  const { data, error, isError, isPending, isSuccess } = getMyRaces({
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
  const races: MyRaces[] = data?.data;
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">My Races</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Filter by Status:</span>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="UPCOMING">Upcoming</SelectItem>
              <SelectItem value="LIVE">Live</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DataTable columns={MyRacesColumns} data={races} />
    </>
  );
}
