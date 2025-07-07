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
