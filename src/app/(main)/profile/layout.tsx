"use client";

import ProfileSidebar from "@/components/ProfileSidebar";
import { RacesCarousel } from "@/components/RacesCarousel";
import { listRaces } from "@/lib/api/race";
import { useSession } from "@/lib/auth-client";
import useUserStore from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data, error, isPending } = useSession();
  const router = useRouter();
  const { setUserData } = useUserStore.getState();
  useEffect(() => {
    if (!isPending && data === null) {
      router.push("/login");
      return;
    }
    if (data) {
      setUserData(data.session, data.user);
    }
  }, [data, isPending, setUserData, router]);

  if (isPending || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    router.push("/login");
  }
  return (
    <>
      <div className="w-full">
        <RacesCarousel />
      </div>
      <div className="flex flex-col lg:flex-row p-4 sm:p-6 lg:p-10 gap-4 lg:gap-6">
        <ProfileSidebar />
        <div className="w-full max-w-5xl mx-auto">{children}</div>
      </div>
    </>
  );
}
