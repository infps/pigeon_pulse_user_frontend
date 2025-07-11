"use client";
import { MyRaces, MyRacesColumns } from "@/components/columns";
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
    return <LoadingSpinner fullScreen message="Loading your races..." />;
  }
  
  if (isError && error) {
    return (
      <ErrorDisplay
        title="Failed to Load Your Races"
        message="We couldn't load your race history. Please try again."
        error={error as Error}
        onRetry={() => window.location.reload()}
        size="md"
      />
    );
  }
  
  if (isSuccess && !data) {
    return (
      <ErrorDisplay
        title="No Race Data"
        message="You haven't participated in any races yet."
        showRetry={false}
        size="md"
      />
    );
  }
  
  const races: MyRaces[] = data?.data || [];
  
  return (
    <div className="p-4 sm:p-6">
      {/* Header Section - Responsive */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4 sm:mb-6 gap-3 lg:gap-0">
        <h1 className="text-xl sm:text-2xl font-bold">My Races</h1>
        
        {/* Filter Section - Responsive */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full lg:w-auto">
          <span className="text-sm font-medium whitespace-nowrap">Filter by Status:</span>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              {/* <SelectItem value="">All Statuses</SelectItem> */}
              <SelectItem value="UPCOMING">Upcoming</SelectItem>
              <SelectItem value="LIVE">Live</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Data Table Section - Responsive */}
      {races.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-sm sm:text-base">
            {status ? `No ${status.toLowerCase()} races found.` : "You haven't participated in any races yet."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <DataTable columns={MyRacesColumns} data={races} />
        </div>
      )}
    </div>
  );
}
