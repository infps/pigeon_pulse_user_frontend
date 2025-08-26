type User = {
  name: string | null;
  email: string;
  id: string;
  role: "BREEDER" | "ADMIN" | "SUPER_ADMIN";
  status: "ACTIVE" | "INACTIVE" | "PROSPECT";
};

type CurrentUser = {
  id: string;
  email: string;
  name: string;
  country: string | null;
  ssn: string | null;
  taxNumber: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  primaryPhone: string | null;
  cellPhone: string | null;
  fax: string | null;
  sms: string | null;
  alternativeEmail: string | null;
  webAddress: string | null;
};

type Bird = {
  id: string;
  birdName: string;
  color: string;
  sex: "HEN" | "COCK";
};

type ListEvents = {
  name: string;
  status: "OPEN" | "CLOSED";
  shortName: string;
  date: Date;
  id: string;
  _count: {
    EventInventoryItem: number;
  };
};

type Event = {
  id: string;
  name: string;
  shortName: string;
  date: Date;
  status: "OPEN" | "CLOSED";
  _count: {
    EventInventoryItem: number;
  };
  feeSchema: {
    entryFee: number;
    hs1Fee: number;
    hs2Fee: number;
    hs3Fee: number;
    finalRaceFee: number;
    perchFee: number;
  };
  finalRacePrizeSchema: {
    distributions: Distribution[];
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
  registration_date: Date;
  reserved_birds: number;
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
