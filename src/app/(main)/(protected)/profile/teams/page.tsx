"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateTeam,
  useGetBreederTeams,
  useUpdateTeam,
  useDeleteTeam,
} from "@/lib/api/team";
import { useAuthStore } from "@/store/store";
import { Team } from "@/lib/types";
import React, { useState } from "react";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";

export default function TeamsPage() {
  const { user } = useAuthStore();
  const breederId = user?.idBreeder.toString();

  const { data, error, isError, isPending, isSuccess } =
    useGetBreederTeams(breederId || "");

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [editTeamName, setEditTeamName] = useState("");

  const { mutateAsync: createTeam, isPending: isCreating } = useCreateTeam();
  const { mutateAsync: updateTeam, isPending: isUpdating } = useUpdateTeam(
    selectedTeam?.idTeam.toString() || ""
  );
  const { mutateAsync: deleteTeam, isPending: isDeleting } = useDeleteTeam(
    selectedTeam?.idTeam.toString() || ""
  );

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamName.trim()) {
      toast.error("Team name is required");
      return;
    }
    if (!breederId) {
      toast.error("User not logged in");
      return;
    }

    try {
        if(!createTeam) return;
      const { data, error } = await createTeam({
        teamName: newTeamName,
        breederId: parseInt(breederId),
      });
      if (error) {
        toast.error(error || "Failed to create team");
        return;
      }
      toast.success("Team created successfully");
      setNewTeamName("");
      setIsCreateDialogOpen(false);
    } catch (error) {
      toast.error("An error occurred while creating the team");
    }
  };

  const handleUpdateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTeamName.trim()) {
      toast.error("Team name is required");
      return;
    }
    if (!selectedTeam) return;

    try {
        if(!updateTeam) return;
      const { data, error } = await updateTeam({
        teamName: editTeamName,
      });
      if (error) {
        toast.error(error || "Failed to update team");
        return;
      }
      toast.success("Team updated successfully");
      setIsEditDialogOpen(false);
      setSelectedTeam(null);
      setEditTeamName("");
    } catch (error) {
      toast.error("An error occurred while updating the team");
    }
  };

  const handleDeleteTeam = async () => {
    if (!selectedTeam) return;

    try {
        if(!deleteTeam) return;
      const { data, error } = await deleteTeam({});
      if (error) {
        toast.error(error || "Failed to delete team");
        return;
      }
      toast.success("Team deleted successfully");
      setIsDeleteDialogOpen(false);
      setSelectedTeam(null);
    } catch (error) {
      toast.error("An error occurred while deleting the team");
    }
  };

  const openEditDialog = (team: Team) => {
    setSelectedTeam(team);
    setEditTeamName(team.teamName || "");
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (team: Team) => {
    setSelectedTeam(team);
    setIsDeleteDialogOpen(true);
  };

  if (isPending) return <div>Loading teams...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const teams: Team[] = data?.data || [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Teams</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Team</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Create New Team</DialogTitle>
            <DialogDescription>
              Add a new team to organize your birds and activities.
            </DialogDescription>
            <form onSubmit={handleCreateTeam} className="space-y-4">
              <div>
                <Label htmlFor="teamName">Team Name</Label>
                <Input
                  id="teamName"
                  type="text"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  placeholder="Enter team name"
                  required
                />
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                  disabled={isCreating}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isCreating}>
                  {isCreating ? "Creating..." : "Create Team"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {teams.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>No teams yet. Create your first team to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map((team) => (
            <div
              key={team.idTeam}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{team.teamName}</h3>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => openEditDialog(team)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => openDeleteDialog(team)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Team Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogTitle>Edit Team</DialogTitle>
          <DialogDescription>Update the team name.</DialogDescription>
          <form onSubmit={handleUpdateTeam} className="space-y-4">
            <div>
              <Label htmlFor="editTeamName">Team Name</Label>
              <Input
                id="editTeamName"
                type="text"
                value={editTeamName}
                onChange={(e) => setEditTeamName(e.target.value)}
                placeholder="Enter team name"
                required
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditDialogOpen(false);
                  setSelectedTeam(null);
                  setEditTeamName("");
                }}
                disabled={isUpdating}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? "Updating..." : "Update Team"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogTitle>Delete Team</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{selectedTeam?.teamName}"? This
            action cannot be undone.
          </DialogDescription>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setSelectedTeam(null);
              }}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteTeam}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Team"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
