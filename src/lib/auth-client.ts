import { createAuthClient } from "better-auth/react";

export const { signUp, signIn, getSession, signOut, useSession } =
  createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  });
