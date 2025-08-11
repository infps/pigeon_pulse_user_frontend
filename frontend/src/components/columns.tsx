import { ColumnDef } from "@tanstack/react-table";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Pencil } from "lucide-react";
import { Bird } from "@/lib/types";
import { BirdUpdateForm } from "./BirdCreateForm";

export const BirdColumns: ColumnDef<Bird>[] = [
  {
    header: "Sl. No.",
    accessorKey: "id",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "birdName",
    header: "Bird Name",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "sex",
    header: "Sex",
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => (
      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Pencil size={20} className="cursor-pointer text-primary" />
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Edit Bird</DialogTitle>
            <BirdUpdateForm values={row.original} />
          </DialogContent>
        </Dialog>
      </div>
    ),
  },
];
