"use client";
import RaceComponent from "@/components/RaceComponent";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorDisplay from "@/components/ErrorDisplay";
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
    return <LoadingSpinner fullScreen message="Loading race details..." />;
  }

  if (isError && error) {
    return (
      <ErrorDisplay
        title="Failed to Load Race"
        message="We couldn't load the race details. Please try again."
        error={error as Error}
        onRetry={() => window.location.reload()}
        size="lg"
      />
    );
  }

  if (isSuccess && !data) {
    return (
      <ErrorDisplay
        title="Race Not Found"
        message="The race you're looking for doesn't exist or has been removed."
        showRetry={false}
        size="md"
      />
    );
  }

  const race: ListRaces = data?.data;

  return (
    <div className="min-h-screen">
      {/* Hero Section - Responsive */}
      <div className="bg-gradient-to-r from-white to-primary h-48 flex items-center px-4 sm:px-6 lg:px-10 sm:h-64 lg:h-96 relative overflow-hidden">
        <div className="max-w-2xl z-10">
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold tracking-wider uppercase leading-tight">
            {race.name}
          </h1>
          <p className="mt-2 sm:mt-4 font-light text-xs sm:text-sm lg:text-base max-w-lg">
            {race.description ||
              "Experience the thrill of this exciting pigeon race."}
          </p>
        </div>
      </div>

      {/* Race Info Cards - Responsive */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 items-center">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">
                Race Route
              </p>
              <p className="text-sm sm:text-base font-medium">
                {race.startLocation} to {race.endLocation}
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Entry Fee</p>
              <p className="text-sm sm:text-base font-medium">
                $ {race.entryFee}
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Race Date</p>
              <p className="text-sm sm:text-base font-medium">
                {new Date(race.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">
                Spots Available
              </p>
              <p className="text-sm sm:text-base font-medium">
                {race.maxParticipants - race._count.entries}
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">
                Total Distance
              </p>
              <p className="text-sm sm:text-base font-medium">
                {race.distanceKm} km
              </p>
            </div>
            <Button
              onClick={() => {
                if (race.status !== "UPCOMING") {
                  toast.error("You can only register for upcoming races.");
                  return;
                }
                router.push(`/races/${race.id}/register`);
              }}
              size="lg"
              className="w-full sm:w-auto px-8"
            >
              Register Now
            </Button>
          </div>

          {/* Register Button */}
        </div>
      </div>

      {/* Rules and Regulations - Responsive */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
            Rules and Regulations
          </h2>
          <div className="prose max-w-none text-sm sm:text-base text-gray-700">
            {race.rules || "Rules and regulations will be updated soon."}
          </div>
        </div>
      </div>

      {/* More Races Section */}
      <div className="bg-gray-50">
        <MoreRaces />
      </div>
    </div>
  );
}

function MoreRaces() {
  const { data, error, isError, isPending, isSuccess } = listRaces({
    params: {},
  });

  if (isPending) {
    return <LoadingSpinner message="Loading more races..." />;
  }

  if (isError && error) {
    return (
      <ErrorDisplay
        title="Failed to Load More Races"
        message="We couldn't load additional races."
        error={error as Error}
        showRetry={false}
        showGoBack={false}
        size="sm"
      />
    );
  }

  if (isSuccess && !data) {
    return null;
  }

  const races: ListRaces[] = data?.data || [];

  if (races.length === 0) {
    return null;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
          More Races You Might Like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {races.slice(0, 4).map((race) => (
            <RaceComponent key={race.id} race={race} />
          ))}
        </div>
      </div>
    </div>
  );
}
