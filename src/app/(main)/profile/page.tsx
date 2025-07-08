"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUserStore from "@/store/store";
import React from "react";

export default function page() {
  const { userData } = useUserStore();
  if (!userData.user) {
    return null;
  }
  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-full">
          <Label>Name</Label>
          <Input value={userData?.user?.name} className="w-full mt-2 h-12 sm:h-14" disabled />
        </div>
        <div className="w-full">
          <Label>Email</Label>
          <Input value={userData?.user?.email} className="w-full mt-2 h-12 sm:h-14" disabled />
        </div>
      </div>
    </div>
  );
}
