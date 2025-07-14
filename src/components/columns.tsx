import { ColumnDef } from "@tanstack/react-table";
import { CircleArrowRight, Eye } from "lucide-react";
import Link from "next/link";

export type MyLofts = {
  id: string;
  name: string;
  loftId: string;
  location: string;
};

export type SharedLofts = {
  user: {
    name: string | null;
  };
  id: string;
  loftId: string;
  name: string;
  location: string;
  userId: string;
  createdAt: Date;
};

export const SharedLoftsColumns: ColumnDef<SharedLofts>[] = [
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
    accessorKey: "user.name",
    header: "Shared By",
    cell: ({ row }) => {
      const userName = row.original.user.name;
      return (
        <span className="text-muted-foreground">{userName || "Unknown"}</span>
      );
    },
  },
];

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

export type MyRaces = {
  id: string;
  userId: string;
  createdAt: Date;
  status: "PENDING" | "PAID" | "CANCELLED";
  raceId: string;
  birdId: string;
  paymentId: string | null;
  birdStatus: "UNKNOWN" | "ARRIVED" | "DISQUALIFIED" | "RETIRED" | "MISSING";
  arrivalTime: Date | null;
  position: number | null;
  speed: number | null;
  race: {
    status: "UPCOMING" | "LIVE" | "COMPLETED";
    id: string;
    name: string;
  };
  bird: {
    select: {
      id: true;
      name: true;
      breed: true;
      rfIdTag: true;
    };
  };
};

export const MyRacesColumns: ColumnDef<MyRaces>[] = [
  {
    accessorKey: "Sl No.",
    header: "Sl No.",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "race.name",
    header: "Race Name",
  },
  {
    accessorKey: "bird.name",
    header: "Bird Name",
  },
  {
    accessorKey: "bird.rfIdTag",
    header: "RFID Tag",
  },
  {
    accessorKey: "race.status",
    header: "Race Status",
    cell: ({ row }) => {
      const raceStatus = row.original.race.status;
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            raceStatus === "UPCOMING"
              ? "bg-blue-100 text-blue-800"
              : raceStatus === "LIVE"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {raceStatus}
        </span>
      );
    },
  },
  {
    accessorKey: "position",
    header: "Position",
    cell: ({ row }) => {
      const position = row.original.position;
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
          {position !== null ? position : "N/A"}
        </span>
      );
    },
  },
  {
    accessorKey: "speed",
    header: "Speed (m/s)",
    cell: ({ row }) => {
      const speed = row.original.speed;
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
          {speed !== null ? speed.toFixed(2) : "N/A"}
        </span>
      );
    },
  },
  {
    accessorKey: "birdStatus",
    header: "Bird Status",
    cell: ({ row }) => {
      const birdStatus = row.original.birdStatus;
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            birdStatus === "ARRIVED"
              ? "bg-green-100 text-green-800"
              : birdStatus === "DISQUALIFIED"
              ? "bg-red-100 text-red-800"
              : birdStatus === "RETIRED"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {birdStatus}
        </span>
      );
    },
  },
];

type RaceEntry = {
  race: {
    id: string;
    name: string;
  };
  bird: {
    id: string;
    name: string;
    bandNumber: string;
  };
};

export type MyPayments = {
  raceEntries: RaceEntry[];
  id: string;
  paypalTransactionId: string;
  payerEmail: string;
  amount: number;
  currency: string;
  status: "PENDING" | "SUCCESS" | "FAILES";
  paymentTime: Date;
  userId: string;
  createdAt: Date;
};

export const MyPaymentsColumns: ColumnDef<MyPayments>[] = [
  {
    accessorKey: "Sl No.",
    header: "Sl No.",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "paypalTransactionId",
    header: "Transaction ID",
  },
  {
    accessorKey: "payerEmail",
    header: "Payer Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => `$${row.original.amount.toFixed(2)}`,
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            status === "PENDING"
              ? "bg-yellow-100 text-yellow-800"
              : status === "SUCCESS"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </span>
      );
    },
  },
];

export type FireBird = {
  ID_RACE_ITEM: number | null;
  BIRD_POSITION: number | null;
  ARRIVAL_TIME: string | null;
  BIRD_DROP: number | null;
  PRIZE_VALUE: number | null;
};

export const FireBirdsColumns: ColumnDef<FireBird>[] = [
  {
    accessorKey: "ID_RACE_ITEM",
    header: "ID_RACE_ITEM",
  },
  {
    accessorKey: "BIRD_POSITION",
    header: "BIRD_POSITION",
  },
  {
    accessorKey: "ARRIVAL_TIME",
    header: "ARRIVAL_TIME",
  },
  {
    accessorKey: "BIRD_DROP",
    header: "BIRD_DROP",
  },
  {
    accessorKey: "PRIZE_VALUE",
    header: "PRIZE_VALUE",
  },
];

export type FireBirdRaceResult = {
  RACE_NUMBER: number;
  LOCATION: string;
  DISTANCE: number;
  START_TIME: string;
  SUNRISE: string;
  SUNSET: string;
};

export const FireBirdRaceResultsColumns: ColumnDef<FireBirdRaceResult>[] = [
  {
    accessorKey: "RACE_NUMBER",
    header: "Race Number",
  },
  {
    accessorKey: "LOCATION",
    header: "Location",
  },
  {
    accessorKey: "DISTANCE",
    header: "Distance (km)",
  },
  {
    accessorKey: "START_TIME",
    header: "Start Time",
    accessorFn: (row) => {
      const date = new Date(row.START_TIME);
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h24",
      });
    },
  },
  {
    accessorKey: "SUNRISE",
    header: "Sunrise",
    accessorFn: (row) => {
      const date = new Date(row.SUNRISE);
      return date.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h24",
      });
    },
  },
  {
    accessorKey: "SUNSET",
    header: "Sunset",
    accessorFn: (row) => {
      const date = new Date(row.SUNSET);
      return date.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h24",
      });
    },
  },
];

export type FireBirdBreeder = {
  ID_BREEDER: number;
  STATUS: number;
  FIRST_NAME: string;
  LAST_NAME: string;
  COUNTRY: string | null;
  SOCIAL_SECURITY_NUMBER: string;
  TAX_NUMBER: string;
  ADDRESS_1: string;
  CITY_1: string;
  ZIP_1: string;
  STATE_1: string;
  PHONE: string;
  CELL: string;
  FAX: string;
  SMS: string;
  EMAIL: string;
  EMAIL_2: string;
  WEB_ADDRESS: string;
};

export const FireBirdBreedersColumns: ColumnDef<FireBirdBreeder>[] = [
  {
    accessorKey: "ID_BREEDER",
    header: "ID_BREEDER",
  },
  {
    accessorKey: "STATUS",
    header: "STATUS",
  },
  {
    header: "Name",
    accessorFn: (row) => `${row.FIRST_NAME} ${row.LAST_NAME}`,
    id: "name",
  },
  {
    accessorKey: "COUNTRY",
    header: "Country",
  },
  {
    accessorKey: "SOCIAL_SECURITY_NUMBER",
    header: "Social Security Number",
  },
  {
    accessorKey: "TAX_NUMBER",
    header: "Tax Number",
  },
  {
    accessorKey: "ADDRESS_1",
    header: "Address Line 1",
  },
  {
    accessorKey: "CITY_1",
    header: "City",
  },
  {
    accessorKey: "ZIP_1",
    header: "ZIP Code",
  },
  {
    accessorKey: "STATE_1",
    header: "State/Province",
  },
  {
    accessorKey: "PHONE",
    header: "Phone Number",
  },
  {
    accessorKey: "CELL",
    header: "Cell Number",
  },
  {
    accessorKey: "FAX",
    header: "Fax Number",
  },
  {
    accessorKey: "SMS",
    header: "SMS Enabled?",
  },
  {
    accessorKey: "EMAIL",
    header: "Email Address",
  },
  {
    accessorKey: "EMAIL_2",
    header: "Secondary Email Address",
  },
  {
    accessorKey: "WEB_ADDRESS",
    header: "Web Address",
  },
];

export type FireBirdEventInventory = {
  LOFT: string;
  BIRD_NO: number;
  BREEDER: number;
  SIGN_IN_DATE: string;
  WAITING: number;
  WAITING_DATE: string | null;
  RESERVED_BIRDS: number;
  PERCH_FEE_VALUE: number;
  BIRDS_IN_LOFT: number;
};

export const FireBirdEventInventoryColumns: ColumnDef<FireBirdEventInventory>[] =
  [
    {
      accessorKey: "LOFT",
      header: "Loft",
    },
    {
      accessorKey: "BIRD_NO",
      header: "Bird No.",
    },
    {
      accessorKey: "BREEDER",
      header: "Breeder",
    },
    {
      accessorKey: "SIGN_IN_DATE",
      header: "Sign In Date",
    },
    {
      accessorKey: "WAITING",
      header: "Waiting",
    },
    {
      accessorKey: "WAITING_DATE",
      header: "Waiting Date",
      cell: ({ row }) => {
        const waitingDate = row.original.WAITING_DATE;
        if (waitingDate === null) return "-";
        const date = new Date(waitingDate);
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      },
    },
    {
      accessorKey: "RESERVED_BIRDS",
      header: "Reserved Birds",
    },
    {
      accessorKey: "PERCH_FEE_VALUE",
      header: "Perch Fee Value",
      cell: ({ row }) => {
        const value = row.original.PERCH_FEE_VALUE;
        if (value === null) return "-";
        return `$${value.toFixed(2)}`;
      },
    },
    {
      accessorKey: "BIRDS_IN_LOFT",
      header: "Birds in Loft",
    },
  ];
