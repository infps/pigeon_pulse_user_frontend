"use client";

import EventComponent from "@/components/EventComponent";
import { Button } from "@/components/ui/button";
import { useGetEventById, useGetMoreEvents } from "@/lib/api/event";
import { Event } from "@/lib/types";
import { useRouter } from "next/navigation";
import { use } from "react";
import { toast } from "sonner";

export default function page({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const router = useRouter();
  const { eventId } = use(params);
  const { data, isError, error, isPending, isSuccess } =
    useGetEventById(eventId);
  if (isPending)
    return (
      <div className="h-40 flex items-center justify-center">Loading...</div>
    );
  if (isError)
    return (
      <div className="h-40 flex items-center justify-center">
        Error: {error.message}
      </div>
    );

  if (isSuccess && !data) {
    return (
      <div className="h-40 flex items-center justify-center">
        Event not found
      </div>
    );
  }
  const event: Event = data?.data;

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-white to-primary h-48 flex items-center px-4 sm:px-6 lg:px-10 sm:h-64 lg:h-96 relative overflow-hidden">
        <div className="max-w-2xl z-10">
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold tracking-wider uppercase leading-tight">
            {event.name}
          </h1>
          <p className="mt-2 sm:mt-4 font-light text-xs sm:text-sm lg:text-base max-w-lg">
            Experience the thrill of this exciting pigeon race.
          </p>
        </div>
      </div>
      <div className="p-4 sm:p-6 lg:p-8">
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 items-center">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Entry Fee</p>
              <p className="text-sm sm:text-base font-medium">
                $ {event.feeSchema.entryFee}
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">
                Perch Fees
              </p>
              <p className="text-sm sm:text-base font-medium">
                $ {event.feeSchema.perchFeeItems[0].perchFee}
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">
                Final Race Fee
              </p>
              <p className="text-sm sm:text-base font-medium">
                $ {event.feeSchema.hotSpotFinalFee}
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Race Date</p>
              <p className="text-sm sm:text-base font-medium">
                {new Date(event.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">
                Participants
              </p>
              <p className="text-sm sm:text-base font-medium">
                {event._count.eventInventoryItems}
              </p>
            </div>
            <Button
              onClick={() => {
                if (!event.isOpen) {
                  toast.error("You can only register for upcoming races.");
                  return;
                }
                router.push(`/events/${event.id}/register`);
              }}
              size="lg"
              className="w-full sm:w-auto px-8"
            >
              Register Now
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-gray-50">
        <MoreEvents id={event.id} />
      </div>
    </div>
  );
}

function MoreEvents({ id }: { id: string }) {
  const { data, error, isError, isPending, isSuccess } = useGetMoreEvents({
    id,
    params: {
      limit: 4,
    },
  });

  if (isPending) {
    return (
      <div className="h-40 flex items-center justify-center">Loading...</div>
    );
  }

  if (isError && error) {
    return (
      <div className="h-40 flex items-center justify-center">
        <p className="text-red-500">Failed to load more races.</p>
      </div>
    );
  }

  if (isSuccess && !data) {
    return null;
  }

  const events: Event[] = data?.data?.events || [];

  if (events.length === 0) {
    return null;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
          More Events You Might Like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {events.map((event) => (
            <EventComponent key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
