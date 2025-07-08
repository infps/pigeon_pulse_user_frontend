"use client";
import { MyLofts, MyLoftsColumns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { listMyLofts } from "@/lib/api/loft";
import Link from "next/link";
import React from "react";

export default function page() {
  const { data, error, isError, isSuccess, isPending } = listMyLofts({
    params: {},
  });
  if (isPending) {
    return <div>Loading...</div>;
  }
  const lofts: MyLofts[] = data?.data || [];
  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
        <h1 className="text-xl sm:text-2xl font-bold">My Lofts</h1>
        <Button asChild className="w-full sm:w-auto">
          <Link href={"/profile/lofts/create"} className="text-white text-center">
            Create Loft
          </Link>
        </Button>
      </div>
      <div className="overflow-x-auto">
        <DataTable columns={MyLoftsColumns} data={lofts} />
      </div>
    </div>
  );
}
