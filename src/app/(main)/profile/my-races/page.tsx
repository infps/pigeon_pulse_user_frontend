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
    <div className="p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4 sm:mb-6 gap-3 lg:gap-0">
        <h1 className="text-xl sm:text-2xl font-bold">My Races</h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full lg:w-auto">
          <span className="text-sm font-medium whitespace-nowrap">Filter by Status:</span>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full sm:w-[180px]">
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
      <div className="overflow-x-auto">
        <DataTable columns={MyRacesColumns} data={races} />
      </div>
    </div>
  );
}
