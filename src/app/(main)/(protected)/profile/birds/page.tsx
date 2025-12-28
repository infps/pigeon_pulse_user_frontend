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
import React, { useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function page() {
  const { data, error, isError, isPending, isSuccess } = useListBirds();
  const [filter, setFilter] = useState<"all" | "available" | "busy">("all");
  
  const birds: Bird[] = data?.data || [];
  
  const filteredBirds = useMemo(() => {
    if (filter === "all") return birds;
    if (filter === "available") {
      return birds.filter(bird => 
        !bird.isLost && 
        (!bird.eventInventoryItems || bird.eventInventoryItems.length === 0)
      );
    }
    if (filter === "busy") {
      return birds.filter(bird => 
        bird.eventInventoryItems && bird.eventInventoryItems.length > 0
      );
    }
    return birds;
  }, [birds, filter]);
  
  const stats = useMemo(() => {
    const available = birds.filter(bird => 
      !bird.isLost && 
      (!bird.eventInventoryItems || bird.eventInventoryItems.length === 0)
    ).length;
    const busy = birds.filter(bird => 
      bird.eventInventoryItems && bird.eventInventoryItems.length > 0
    ).length;
    const lost = birds.filter(bird => bird.isLost).length;
    
    return { available, busy, lost, total: birds.length };
  }, [birds]);
  
  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">My Birds</h1>
          <p className="text-sm text-gray-500 mt-1">
            Total: {stats.total} | Available: {stats.available} | Busy in Events: {stats.busy} | Lost: {stats.lost}
          </p>
        </div>
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
      
      <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} className="mb-4">
        <TabsList>
          <TabsTrigger value="all">All Birds ({stats.total})</TabsTrigger>
          <TabsTrigger value="available">Available ({stats.available})</TabsTrigger>
          <TabsTrigger value="busy">Busy in Events ({stats.busy})</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <DataTable columns={BirdColumns} data={filteredBirds} />
    </div>
  );
}
