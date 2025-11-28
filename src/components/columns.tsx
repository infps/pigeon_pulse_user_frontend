import { ColumnDef } from "@tanstack/react-table";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Pencil, CreditCard } from "lucide-react";
import { Bird, MyEvents, MyPayments } from "@/lib/types";
import { BirdUpdateForm } from "./BirdCreateForm";
import { Button } from "./ui/button";
import { PaymentPaypalButton } from "./PaymentPaypalButton";

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
    cell: ({ row }) => {
      const sex = row.original.sex;
      const sexMap: Record<number, string> = {
        0: "N/A",
        1: "Cock",
        2: "Hen",
      };
      return sex !== null && sex !== undefined
        ? sexMap[sex] || "Unknown"
        : "N/A";
    },
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
    accessorKey: "event.eventName",
    header: "Event Name",
  },
  {
    accessorKey: "event.eventDate",
    header: "Event Date",
    cell: ({ row }) => (
      <div>{new Date(row.original.event.eventDate).toLocaleDateString()}</div>
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
];

export const MyPaymentsColumns: ColumnDef<MyPayments>[] = [
  {
    header: "Sl. No.",
    accessorKey: "id",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "eventInventory.event.eventName",
    header: "Event Name",
    cell: ({ row }) => <div>{row.original.eventInventory.event.eventName}</div>,
  },
  {
    accessorKey: "eventInventory.event.eventDate",
    header: "Event Date",
    cell: ({ row }) => (
      <div>
        {new Date(
          row.original.eventInventory.event.eventDate
        ).toLocaleDateString()}
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
    cell: ({ row }) => <div>${row.original.paymentValue?.toFixed(2)}</div>,
  },
  {
    accessorKey: "status",
    header: "Payment Status",
    cell: ({ row }) => {
      const status = row.original.status === 0 ? "pending" : "paid";
      const isDue = status === "pending";

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
            {row.original.status === 0 ? "Pending" : "Paid"}
          </span>
          {isDue && <PaymentPaypalButton paymentId={row.original.idPayment} />}
        </div>
      );
    },
  },
];
