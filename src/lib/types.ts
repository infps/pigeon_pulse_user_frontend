type User = {
  name: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  id: string;
  role: "BREEDER" | "ADMIN" | "SUPER_ADMIN";
  status: "ACTIVE" | "INACTIVE" | "PROSPECT";
};

type CurrentUser = {
  id: string;
  breederNumber: string | null;
  email: string;
  firstName: string | null;
  lastName: string | null;
  country: string | null;
  isDefaultAddress1: boolean;
  address1: string | null;
  city1: string | null;
  state1: string | null;
  zip1: string | null;
  address2: string | null;
  city2: string | null;
  state2: string | null;
  zip2: string | null;
  phone: string | null;
  cell: string | null;
  fax: string | null;
  email2: string | null;
  webAddress: string | null;
  sms: string | null;
  ssn: string | null;
  taxNumber: string | null;
  statusDate: string | null;
  note: string | null;
  loginName: string | null;
  loginPassword: string | null;
  defaultNameAgn: string | null;
  defaultNameAs: string | null;
  pictureId: string | null;
};

type Bird = {
  id: string;
  birdName: string;
  color: string;
  sex: "HEN" | "COCK";
};

type ListEvents = {
  name: string;
  shortName: string;
  date: Date;
  isOpen: boolean;
  id: string;
  _count: {
    eventInventoryItems: number;
  };
};

type PerchFeeItem = {
  birdNo: number;
  createdAt: string;
  feeSchemaId: string;
  id: string;
  perchFee: number;
};

type FeeSchema = {
  entryFee: number;
  hotSpot1Fee: number;
  hotSpot2Fee: number;
  hotSpot3Fee: number;
  hotSpotFinalFee: number;
  maxBirdCount: number;
  perchFeeItems: PerchFeeItem[];
};

type PrizeSchema = {
  distributions: Distribution[];
};

type Event = {
  id: string;
  name: string;
  shortName: string;
  type: string; // e.g., "AGN"
  date: Date; // ISO date string ("2025-11-20T18:30:00.000Z")
  isOpen: boolean;

  // Ranges
  trainingFrom: number;
  trainingTo: number;
  inventoryFrom: number;
  inventoryTo: number;
  finalFrom: number;
  finalTo: number;
  hotspotFrom: number;
  hotspotTo: number;

  // Relationships
  bettingSchemeId: string;
  feeSchemaId: string;
  hotspot1PrizeSchemaId: string;
  hotspot2PrizeSchemaId: string;
  hotspot3PrizeSchemaId: string;
  finalRacePrizeSchemaId: string;
  avgWinnerPrizeSchemaId: string;

  // Nested objects
  feeSchema: FeeSchema;
  finalRacePrizeSchema: PrizeSchema;

  // Prisma _count-like relation
  _count: {
    eventInventoryItems: number;
  };
};

type Distribution = {
  fromPosition: number;
  toPosition: number;
  percentage: number;
};

type MyEvents = {
  event: {
    date: Date;
    id: string;
    name: string;
  };
  createdAt: Date;
  reservedBirds: number;
  loft: string;
};

type MyPayments = {
  id: string;
  paymentDate: Date | null;
  paymentValue: number;
  type:
    | "PERCH_FEE"
    | "ENTRY_FEE"
    | "HOTSPOT_FEE_1"
    | "HOTSPOT_FEE_2"
    | "HOTSPOT_FEE_3"
    | "FINAL_RACE_FEE"
    | "OTHER";
  status: string;
  eventInventory: {
    event: {
      id: string;
      name: string;
      date: Date;
    };
  };
};
export type {
  User,
  CurrentUser,
  Bird,
  ListEvents,
  Event,
  MyEvents,
  MyPayments,
};
