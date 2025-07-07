import type { Session, User } from "better-auth";
import { create } from "zustand";
type UserStore = {
  userData: {
    session: Session | null;
    user: User | null;
  };
  error: Error | null;
  setUserData: (session: Session | null, user: User | null) => void;
  setError: (error: Error | null) => void;
};

const useUserStore = create<UserStore>((set) => ({
  userData: {
    session: null,
    user: null,
  },
  error: null,
  setUserData: (session, user) => set({ userData: { session, user } }),
  setError: (error) => set({ error }),
}));

export default useUserStore;
export type { UserStore };