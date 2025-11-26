type User = {
  idBreeder: number;
  name: string | null;
  email: string | null;
  status: number;
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
  sex: number;
};

type ListEvents = {
  idEvent: number;
  eventDate: string;
  eventName: string;
  eventShortName: string;
  isOpen: number;
  _count: {
    eventInventories: number;
  };
};

type PerchFeeItem = {
  idPerchFeeItem: number;
  birdNo: number;
  perchFee: number;
  idFeeScheme: number;
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
  idEvent: number;
  eventName: string;
  eventShortName: string;
  eventDate: string;
  isOpen: number;
  eventType: number;
  _count: {
    eventInventories: number;
  };
  idFeeScheme: number;
  idHotSpotAvgPrizeScheme: number;
  idHotSpot1PrizeScheme: number;
  idHotSpot2PrizeScheme: number;
  idHotSpot3PrizeScheme: number;
  idBettingScheme: number;
  idFinalPrizeScheme: number;
  feeScheme: {
    maxBirdCount: number;
    entryFee: number;
    hotSpot1Fee: number;
    hotSpot2Fee: number;
    hotSpot3Fee: number;
    hotSpotFinalFee: number | null;
    perchFeeItems: PerchFeeItem[];
  };
  finalPrizeScheme: {
    prizeSchemeItems: Distribution[];
  };
};

type Distribution = {
  fromPosition: number;
  toPosition: number;
  prizeValue: number;
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
