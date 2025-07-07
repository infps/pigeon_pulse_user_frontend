import { ColumnDef } from "@tanstack/react-table";
import { CircleArrowRight, Eye } from "lucide-react";
import Link from "next/link";

export type MyLofts = {
  id: string;
  name: string;
  loftId: string;
  location: string;
};

export type Bird = {
  id: string;
  name: string;
  status: "ACTIVE" | "MISSING" | "HOSPITALIZED";
  bandNumber: string;
  breed: string | null;
  color: string | null;
};

export type Loft = {
  birds: Bird[];
  _count: {
    birds: number;
  };
  id: string;
  loftId: string;
  name: string;
  location: string;
  userId: string;
  createdAt: Date;
};

export const MyLoftsColumns: ColumnDef<MyLofts>[] = [
  {
    accessorKey: "Sl No.",
    header: "Sl No.",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Loft Name",
  },
  {
    accessorKey: "loftId",
    header: "Loft ID",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "action",
    header: () => <div className="text-right">Action</div>,
    cell: ({ row }) => {
      const loft = row.original;
      return (
        <div className="flex items-center justify-end gap-2">
          <Link href={`/profile/lofts/${loft.id}`}>
            <Eye size={20} />
          </Link>
          <Link href={`/profile/lofts/update/${loft.id}`}>
            <CircleArrowRight size={20} />
          </Link>
        </div>
      );
    },
  },
];

export const BirdsColumns: ColumnDef<Bird>[] = [
  {
    accessorKey: "Sl No.",
    header: "Sl No.",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Bird Name",
  },
  {
    accessorKey: "bandNumber",
    header: "Band Number",
  },
  {
    accessorKey: "breed",
    header: "Breed",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const bird = row.original;
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            bird.status === "ACTIVE"
              ? "bg-green-100 text-green-800"
              : bird.status === "MISSING"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {bird.status}
        </span>
      );
    },
  },
  {
    accessorKey: "action",
    header: () => <div className="text-right">Action</div>,
    cell: ({ row }) => {
      const bird = row.original;
      return (
        <div className="flex items-center justify-end gap-2">
          <Link href={`/profile/birds/${bird.id}`}>
            <Eye size={20} />
          </Link>
        </div>
      );
    },
  },
];
