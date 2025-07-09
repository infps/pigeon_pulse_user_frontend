"use client";
import RaceComponent from "@/components/RaceComponent";
import { Button } from "@/components/ui/button";
import { getRace, listRaces } from "@/lib/api/race";
import { ListRaces } from "@/lib/types";
import { useRouter } from "next/navigation";
import { use } from "react";
import { toast } from "sonner";

export default function page({
  params,
}: {
  params: Promise<{ raceId: string }>;
}) {
  const { raceId } = use(params);
  const router = useRouter();
  const { data, error, isError, isPending, isSuccess } = getRace({
    params: {},
    raceId,
  });
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError && error) {
    return <div>Error: {error.message}</div>;
  }
  if (isSuccess && !data) {
    return <div>No data found</div>;
  }
  const race: ListRaces = data?.data;
  return (
    <div>
      <div className="bg-gradient-to-r from-white to-primary h-48 flex items-center px-10 sm:h-64 lg:h-96 relative">
        <div className="max-w-2xl">
          <h1 className="text-xl sm:text-4xl lg:text-5xl font-semibold tracking-wider uppercase">
            {race.name}
          </h1>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-evenly gap-10 py-4 w-[95%] mx-auto">
        <div id="pointer" className="flex items-center flex-1">
          <div className="ml-10">
            <p className="text-sm">Race Route</p>
            <p className="text-sm">
              {race.startLocation} to {race.endLocation}
            </p>
          </div>
        </div>
        <div id="pointer" className="flex items-center flex-1">
          <div className="ml-10">
            <p className="text-sm">Entry Fee</p>
            <p className="text-sm">$ {race.entryFee}</p>
          </div>
        </div>
        <div id="pointer" className="flex items-center flex-1">
          <div className="ml-10">
            <p className="text-sm">Race Date</p>
            <p className="text-sm">
              {new Date(race.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
        <div id="pointer" className="flex items-center flex-1">
          <div className="ml-10">
            <p className="text-sm">Spots Available</p>
            <p className="text-sm">
              {race.maxParticipants - race._count.entries}
            </p>
          </div>
        </div>
        <div id="pointer" className="flex items-center flex-1">
          <div className="ml-10">
            <p className="text-sm">Total Distance</p>
            <p className="text-sm">{race.distanceKm}</p>
          </div>
        </div>
        <Button
          onClick={() => {
            if (race.status !== "UPCOMING") {
              toast.error("You can only register for upcoming races.");
              return;
            }
            router.push(`/races/${race.id}/register`);
          }}
          asChild
          className="bg-transparent cursor-pointer shadow-none rounded-none text-black"
        >
          <div id="pointer" className="flex items-center flex-1">
            <p>Register Now</p>
          </div>
        </Button>
      </div>
      <div className="p-4 lg:p-6">
        <h1 className="text-2xl font-semibold mt-5">Rules and Regulations</h1>
        <div className="mt-4">{race.rules}</div>
      </div>
      <MoreRaces />
    </div>
  );
}

function MoreRaces() {
  const { data, error, isError, isPending, isSuccess } = listRaces({
    params: {},
  });
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError && error) {
    return <div>Error: {error.message}</div>;
  }
  if (isSuccess && !data) {
    return <div>No data found</div>;
  }
  const races: ListRaces[] = data?.data || [];
  return (
    <div className="p-6 sm:p-8 lg:p-10">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        More Races You Might Like
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {races.map((race) => (
          <RaceComponent key={race.id} race={race} />
        ))}
      </div>
    </div>
  );
}
