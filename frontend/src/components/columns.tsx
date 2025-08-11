import { ColumnDef } from "@tanstack/react-table";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Pencil } from "lucide-react";
import { Bird, MyEvents } from "@/lib/types";
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

export const MyEventsColumns: ColumnDef<MyEvents>[] = [
  {
    header: "Sl. No.",
    accessorKey: "id",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "event.name",
    header: "Event Name",
  },
  {
    accessorKey: "event.date",
    header: "Event Date",
    cell: ({ row }) => (
      <div>{new Date(row.original.event.date).toLocaleDateString()}</div>
    ),
  },
  {
    accessorKey: "reserved_birds",
    header: "Reserved Birds",
  },
  {
    accessorKey: "loft",
    header: "Loft",
  },
  {
    accessorKey: "payment.paymentValue",
    header: "Payment Amount",
    cell: ({ row }) => (
      <div>{row.original.payment?.paymentValue.toFixed(2)}</div>
    ),
  },
  {
    accessorKey: "payment.status",
    header: "Payment Status",
  },
];
