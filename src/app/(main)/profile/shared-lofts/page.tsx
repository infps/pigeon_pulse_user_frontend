"use client";
import { SharedLofts, SharedLoftsColumns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import {
  listSharedLoft,
  listLoftInvitations,
  acceptLoftInvitation,
  rejectLoftInvitation,
} from "@/lib/api/loft";
import { LoftInvitations } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";

export default function page() {
  const [isInvitationsOpen, setIsInvitationsOpen] = useState(false);

  const { data, error, isError, isSuccess, isPending } = listSharedLoft({
    params: {},
  });

  const { data: invitationsData, isPending: isInvitationsPending } =
    listLoftInvitations({
      params: {},
    });

  if (isPending) {
    return <div>Loading...</div>;
  }

  const lofts: SharedLofts[] = data?.data || [];
  const invitations: LoftInvitations[] = invitationsData?.data || [];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Lofts shared with me</h1>
        <Dialog open={isInvitationsOpen} onOpenChange={setIsInvitationsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              Invitations (
              {invitations.filter((inv) => inv.status === "PENDING").length})
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Loft Invitations</DialogTitle>
              <DialogDescription>
                Review and manage your pending loft invitations
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {isInvitationsPending ? (
                <div>Loading invitations...</div>
              ) : invitations.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  No invitations found
                </div>
              ) : (
                invitations
                  .filter((invitation) => invitation.status === "PENDING")
                  .map((invitation) => (
                    <InvitationComponent
                      key={invitation.id}
                      invitation={invitation}
                    />
                  ))
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable columns={SharedLoftsColumns} data={lofts} />
    </div>
  );
}

function InvitationComponent({ invitation }: { invitation: LoftInvitations }) {
  const { mutateAsync: acceptInviteMutateAsync } = acceptLoftInvitation({
    params: {},
    invitationId: invitation.id,
  });
  const { mutateAsync: rejectInviteMutateAsync } = rejectLoftInvitation({
    params: {},
    invitationId: invitation.id,
  });
  return (
    <div key={invitation.id} className="border rounded-lg p-4 space-y-3">
      <div>
        <h3 className="font-semibold text-lg">{invitation.loft.name}</h3>
        <p className="text-sm text-muted-foreground">
          Location: {invitation.loft.location}
        </p>
        <p className="text-sm text-muted-foreground">
          Invited by: {invitation.invitedBy.name || "Unknown"}
        </p>
        <p className="text-xs text-muted-foreground">
          Invited on: {new Date(invitation.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="default"
          onClick={async () => {
            if (!acceptInviteMutateAsync) return;
            try {
              await acceptInviteMutateAsync({});
              console.log("Invitation accepted:", invitation.id);
            } catch (error) {
              console.error("Error accepting invitation:", error);
            }
          }}
        >
          Accept
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={async () => {
            if (!rejectInviteMutateAsync) return;
            try {
              await rejectInviteMutateAsync({});
              console.log("Invitation rejected:", invitation.id);
            } catch (error) {
              console.error("Error rejecting invitation:", error);
            }
          }}
        >
          Reject
        </Button>
      </div>
    </div>
  );
}
