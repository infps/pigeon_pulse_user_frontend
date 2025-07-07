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
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">My Lofts</h1>
        <Button asChild>
          <Link href={"/profile/lofts/create"} className="text-white">
            Create Loft
          </Link>
        </Button>
      </div>
      <DataTable columns={MyLoftsColumns} data={lofts} />
    </div>
  );
}
