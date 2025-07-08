"use client";
import { BirdsColumns, Loft } from "@/components/columns";
import ComboBox from "@/components/combo-box";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { getLoft, inviteToLoft } from "@/lib/api/loft";
import { listUsers } from "@/lib/api/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use, useState, useEffect } from "react";

export default function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const [searchTerm , setSearchTerm] = useState("");
  const { data, isError, error, isPending, isSuccess } = getLoft({
    params: {},
    loftId: slug,
  });

  if (!slug) {
    router.push("/profile/lofts");
    return null;
  }
  if (isPending) {
    return <div>Loading loft details...</div>;
  }
  if (isError) {
    return <div>Error loading loft details: {error?.message}</div>;
  }

  const loft: Loft = data?.data;

  return (
    <div>
      <div className="rounded-lg border p-4 grid h-32 grid-cols-3 gap-4">
        <div className="border-r flex flex-col justify-between">
          <h1 className="text-muted-foreground">Loft Name</h1>
          <p className="text-2xl font-medium">{loft.name}</p>
        </div>
        <div className="border-r flex flex-col justify-between">
          <h1 className="text-muted-foreground">Loft Location</h1>
          <p className="text-2xl font-medium">{loft.location}</p>
        </div>
        <div className=" flex flex-col justify-between">
          <h1 className="text-muted-foreground">Birds Count</h1>
          <p className="text-2xl font-medium">{loft._count.birds}</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-end gap-4 mb-4">
          <Button asChild>
            <Link
              href={`/profile/lofts/${loft.id}/birds/create`}
              className="text-white"
            >
              Add Bird
            </Link>
          </Button>
        </div>
        <DataTable data={loft.birds} columns={BirdsColumns} />
      </div>
    </div>
  );
}
