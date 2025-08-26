"use client";
import { BirdCreateForm } from "@/components/BirdCreateForm";
import { BirdColumns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useListBirds } from "@/lib/api/bird";
import { Bird } from "@/lib/types";
import React from "react";

export default function page() {
  const { data, error, isError, isPending, isSuccess } = useListBirds();
  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  const birds: Bird[] = data?.data;
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Birds</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Bird</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Add New Bird</DialogTitle>
            <BirdCreateForm />
          </DialogContent>
        </Dialog>
      </div>
      <DataTable columns={BirdColumns} data={birds} />
    </div>
  );
}
