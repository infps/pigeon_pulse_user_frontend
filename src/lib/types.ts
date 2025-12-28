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
  idBird: string;
  birdName: string;
  color: string;
  sex: number;
  band?: string | null;
  band1?: string | null;
  band2?: string | null;
  band3?: string | null;
  band4?: string | null;
  rfId?: string | null;
  isActive?: number | null;
  isLost?: number | null;
  eventInventoryItems?: {
    idEventInventoryItem: number;
    arrivalTime: string | null;
    birdNo: number | null;
    eventInventory: {
      event: {
        idEvent: number;
        eventName: string;
        eventShortName: string;
        eventDate: string;
      };
    };
  }[];
};

type ListEvents = {
  idEvent: number;
  eventDate: string;
  eventName: string;
  eventShortName: string;
  isOpen: number;
  eventType: number | null;
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
    eventDate: Date;
    idEvent: string;
    eventName: string;
  };
  reservedBirds: number;
  loft: string;
};

type MyPayments = {
  idPayment: string;
  paymentDate: string | null;
  paymentValue: number | null;
  paymentType: number | null;
  status: number | null;
  eventInventory: {
    event: {
      idEvent: string;
      eventName: string;
      eventDate: string;
    };
  };
};

type EventParticipantBird = {
  idEventInventoryItem: number;
  birdNo: number | null;
  band: string;
  birdName: string;
  color: string;
  sex: number | null;
};

type EventParticipant = {
  idEventInventory: number;
  idBreeder: number;
  breederName: string;
  loft: string;
  city: string;
  state: string;
  country: string;
  reservedBirds: number;
  signInDate: string | null;
  birds: EventParticipantBird[];
};

type Team = {
  idTeam: number;
  teamName: string | null;
  idBreeder: number | null;
};

type BettingScheme = {
  idBettingScheme: number;
  bettingSchemeName: string | null;
  belgianShow1: number | null;
  belgianShow2: number | null;
  belgianShow3: number | null;
  belgianShow4: number | null;
  belgianShow5: number | null;
  belgianShow6: number | null;
  belgianShow7: number | null;
  standardShow1: number | null;
  standardShow2: number | null;
  standardShow3: number | null;
  standardShow4: number | null;
  standardShow5: number | null;
  standardShow6: number | null;
  wta1: number | null;
  wta2: number | null;
  wta3: number | null;
  wta4: number | null;
  wta5: number | null;
};

type BirdBets = {
  belgianShow1: number;
  belgianShow2: number;
  belgianShow3: number;
  belgianShow4: number;
  belgianShow5: number;
  belgianShow6: number;
  belgianShow7: number;
  standardShow1: number;
  standardShow2: number;
  standardShow3: number;
  standardShow4: number;
  standardShow5: number;
  standardShow6: number;
  wtaBet1: number;
  wtaBet2: number;
  wtaBet3: number;
  wtaBet4: number;
  wtaBet5: number;
};

type ParticipantBird = {
  idEventInventoryItem: number;
  birdNo: number | null;
  bird: {
    idBird: number;
    band: string | null;
    birdName: string | null;
    color: string | null;
    sex: number | null;
  };
  currentBets: BirdBets;
};

type ParticipantBirdsResponse = {
  bettingScheme: BettingScheme;
  birds: ParticipantBird[];
};

export type {
  User,
  CurrentUser,
  Bird,
  ListEvents,
  Event,
  MyEvents,
  MyPayments,
  EventParticipant,
  EventParticipantBird,
  Team,
  BettingScheme,
  BirdBets,
  ParticipantBird,
  ParticipantBirdsResponse,
};
