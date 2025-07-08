export type ListRaces = {
  _count: {
    entries: number;
  };
  status: "UPCOMING" | "LIVE" | "COMPLETED";
  id: string;
  name: string;
  date: Date;
  distanceKm: number;
  startLocation: string;
  endLocation: string;
  entryFee: number;
  maxParticipants: number;
  rules: string | null;
  description: string | null;
  photoUrl: string | null;
  createdAt: Date;
};

export type Bird = {
  _count: {
    raceEntries: number;
  };
  id: string;
  name: string;
  bandNumber: string;
  breed?: string | null;
  color?: string | null;
  gender: "MALE" | "FEMALE";
  age?: number | null;
  photoUrl?: string | null;
  wingspan?: number | null;
  vaccinationStatus?: boolean;
  penNumber?: string | null;
  raceExperience?: number | null;
  status: "ACTIVE" | "MISSING" | "HOSPITALIZED";
  rfIdTag?: string | null;
  loftId: string;
  loft: {
    name: string;
  };
};

export type User = {
  id: string;
  name: string;
  email: string;
};

export type LoftInvitations = {
  loft: {
    id: string;
    name: string;
    location: string;
  };
  invitedBy: {
    id: string;
    name: string | null;
  };
} & {
  id: string;
  status: "PENDING" | "ACCEPTED" | "DECLINED" | "EXPIRED";
  loftId: string;
  createdAt: Date;
  updatedAt: Date;
  invitedById: string;
  invitedUserId: string | null;
};
