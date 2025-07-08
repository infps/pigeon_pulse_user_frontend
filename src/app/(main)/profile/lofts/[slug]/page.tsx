"use client";
import { BirdsColumns, Loft } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getLoft, inviteToLoft } from "@/lib/api/loft";
import { listUsers } from "@/lib/api/user";
import { User } from "@/lib/types";
import { useDebounce } from "@/lib/use-debounce";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use, useState } from "react";
import { toast } from "sonner";

export default function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
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
    <div className="p-4 sm:p-6">
      <div className="rounded-lg border p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 h-auto sm:h-32">
        <div className="sm:border-r flex flex-col justify-between">
          <h1 className="text-muted-foreground text-sm sm:text-base">Loft Name</h1>
          <p className="text-lg sm:text-2xl font-medium">{loft.name}</p>
        </div>
        <div className="sm:border-r flex flex-col justify-between">
          <h1 className="text-muted-foreground text-sm sm:text-base">Loft Location</h1>
          <p className="text-lg sm:text-2xl font-medium">{loft.location}</p>
        </div>
        <div className="flex flex-col justify-between">
          <h1 className="text-muted-foreground text-sm sm:text-base">Birds Count</h1>
          <p className="text-lg sm:text-2xl font-medium">{loft._count.birds}</p>
        </div>
      </div>
      <div className="mt-4 sm:mt-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-4 mb-4 sm:mb-6">
          <ShareLoftDialog slug={slug} />
          <Button asChild className="w-full sm:w-auto">
            <Link
              href={`/profile/lofts/${loft.id}/birds/create`}
              className="text-white text-center"
            >
              Add Bird
            </Link>
          </Button>
        </div>
        <div className="overflow-x-auto">
          <DataTable data={loft.birds} columns={BirdsColumns} />
        </div>
      </div>
    </div>
  );
}

function ShareLoftDialog({ slug }: { slug: string }) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { mutateAsync } = inviteToLoft({
    params: {},
    loftId: slug,
  });

  const debouncedSearchTerm = useDebounce(searchTerm.trim().toLowerCase());

  const {
    data: userData,
    isError,
    error,
    isPending,
    isSuccess,
  } = listUsers({
    params: { email: debouncedSearchTerm },
  });

  const users = (userData?.data as User[]) || [];

  const handleUserInvite = async (userId: string) => {
    try {
      if (mutateAsync) {
        await mutateAsync({ userId });
        toast.success("User invited successfully!");
        setSearchTerm("");
        setSelectedUser(null);
      }
    } catch (error) {
      toast.error("Failed to invite user. Please try again.");
      console.error("Failed to invite user:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto">Share Loft</Button>
      </DialogTrigger>
      <DialogContent className="mx-4 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Loft</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email-search">Search by email</Label>
            <Input
              id="email-search"
              type="email"
              placeholder="Enter email address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {debouncedSearchTerm && (
            <div className="space-y-2">
              {isPending && (
                <p className="text-sm text-muted-foreground">Searching...</p>
              )}

              {isError && (
                <p className="text-sm text-red-500">
                  Error searching users: {error?.message}
                </p>
              )}

              {isSuccess && users.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No users found with that email.
                </p>
              )}

              {users.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Search Results:</p>
                  <div className="max-h-40 overflow-y-auto space-y-1">
                    {users.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-2 border rounded-md hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleUserInvite(user.id)}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {user.name || user.email}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {user.email}
                          </p>
                        </div>
                        <Button size="sm" variant="outline" className="ml-2 flex-shrink-0">
                          Invite
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="w-full sm:w-auto">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
