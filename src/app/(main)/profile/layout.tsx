"use client";

import ProfileSidebar from "@/components/ProfileSidebar";
import { RacesCarousel } from "@/components/RacesCarousel";
import { listRaces } from "@/lib/api/race";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full">
        <RacesCarousel />
      </div>
      <div className="flex p-10">
        <ProfileSidebar />
        <div className=" w-full max-w-5xl mx-auto">{children}</div>
      </div>
    </>
  );
}
