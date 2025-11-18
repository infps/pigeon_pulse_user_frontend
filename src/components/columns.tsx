import { ColumnDef } from "@tanstack/react-table";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Pencil, CreditCard } from "lucide-react";
import { Bird, MyEvents, MyPayments } from "@/lib/types";
import { BirdUpdateForm } from "./BirdCreateForm";
import { Button } from "./ui/button";

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
    accessorKey: "reservedBirds",
    header: "Reserved Birds",
  },
  {
    accessorKey: "loft",
    header: "Loft",
  },
  {
    accessorKey: "registration_date",
    header: "Registration Date",
    cell: ({ row }) => (
      <div>{new Date(row.original.createdAt).toLocaleDateString()}</div>
    ),
  },
];

export const MyPaymentsColumns: ColumnDef<MyPayments>[] = [
  {
    header: "Sl. No.",
    accessorKey: "id",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "eventInventory.event.name",
    header: "Event Name",
    cell: ({ row }) => <div>{row.original.eventInventory.event.name}</div>,
  },
  {
    accessorKey: "eventInventory.event.date",
    header: "Event Date",
    cell: ({ row }) => (
      <div>
        {new Date(row.original.eventInventory.event.date).toLocaleDateString()}
      </div>
    ),
  },
  {
    accessorKey: "paymentDate",
    header: "Payment Date",
    cell: ({ row }) => (
      <div>
        {row.original.paymentDate
          ? new Date(row.original.paymentDate).toLocaleDateString()
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "paymentValue",
    header: "Payment Value",
    cell: ({ row }) => <div>${row.original.paymentValue.toFixed(2)}</div>,
  },
  {
    accessorKey: "type",
    header: "Payment Type",
    cell: ({ row }) => <div>{row.original.type.replace(/_/g, " ")}</div>,
  },
  {
    accessorKey: "status",
    header: "Payment Status",
    cell: ({ row }) => {
      const status = row.original.status.toLowerCase();
      const isDue = status === "due" || status === "pending";

      const getStatusColor = (status: string) => {
        switch (status) {
          case "paid":
          case "completed":
            return "bg-green-100 text-green-800 border-green-200";
          case "due":
          case "pending":
            return "bg-yellow-100 text-yellow-800 border-yellow-200";
          case "overdue":
            return "bg-red-100 text-red-800 border-red-200";
          case "cancelled":
          case "failed":
            return "bg-gray-100 text-gray-800 border-gray-200";
          default:
            return "bg-blue-100 text-blue-800 border-blue-200";
        }
      };

      return (
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
              status
            )}`}
          >
            {row.original.status.charAt(0).toUpperCase() +
              row.original.status.slice(1)}
          </span>
          {isDue && (
            <Button
              size="sm"
              variant="default"
              className="h-7 px-3 text-xs"
              onClick={() => {
                // Handle payment logic here
                console.log("Pay now clicked for payment:", row.original.id);
              }}
            >
              <CreditCard className="w-3 h-3 mr-1" />
              Pay Now
            </Button>
          )}
        </div>
      );
    },
  },
];
