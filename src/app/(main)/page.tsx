"use client";
import EventComponent from "@/components/EventComponent";
import { Button } from "@/components/ui/button";
import { useListEvents } from "@/lib/api/event";
import { ListEvents } from "@/lib/types";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-white to-primary h-48 flex items-center px-4 sm:px-6 lg:px-10 sm:h-64 lg:h-96 relative overflow-hidden">
        <div className="max-w-2xl z-10">
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold tracking-wider uppercase leading-tight">
            TRACK <span className="text-primary">PIGEONS</span>
            <br />
            WATCH LIVE RESULTS
          </h1>
          <p className="mt-2 sm:mt-4 font-light text-xs sm:text-sm lg:text-base max-w-lg">
            Experience the thrill of pigeon racing with real-time tracking and
            live results from competitions around the world.
          </p>
        </div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden sm:block">
          <Image
            src={"/pigeons_on_branch.png"}
            alt="pigeons on branch"
            width={300}
            height={300}
            className="h-32 w-auto sm:h-40 md:h-48 lg:h-64 object-contain"
            priority
          />
        </div>
      </div>
      <div className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Latest Events
          </h2>
          <ListEventsComponent />
        </div>
      </div>
      <div className="bg-primary/10 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <Image
                src={"/pigeon_flying.webp"}
                alt="pigeon flying"
                width={500}
                height={500}
                className="w-full h-auto object-contain max-w-md mx-auto lg:max-w-full"
              />
            </div>
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                Live Pigeon Races
              </h2>
              <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base max-w-lg mx-auto lg:mx-0">
                We are committed to providing our customers with exceptional
                service, competitive pricing, and a wide range of features.
              </p>

              {/* Feature points */}
              <div className="space-y-3 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
                <div className="flex items-center justify-center lg:justify-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm sm:text-base">
                    We are the UK's largest provider, with more patrols in more
                    places
                  </span>
                </div>
                <div className="flex items-center justify-center lg:justify-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm sm:text-base">
                    You get 24/7 roadside assistance
                  </span>
                </div>
                <div className="flex items-center justify-center lg:justify-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm sm:text-base">
                    We fix 4 out of 5 cars at the roadside
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section - Responsive */}
      <div className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-medium text-gray-900 mb-2">
                836M
              </div>
              <div className="text-gray-600 text-xs sm:text-sm lg:text-base">
                Total Race
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-medium text-gray-900 mb-2">
                738M
              </div>
              <div className="text-gray-600 text-xs sm:text-sm lg:text-base">
                Total Loft Manager
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-medium text-gray-900 mb-2">
                100M
              </div>
              <div className="text-gray-600 text-xs sm:text-sm lg:text-base">
                Races Per Day
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-medium text-gray-900 mb-2">
                238M
              </div>
              <div className="text-gray-600 text-xs sm:text-sm lg:text-base">
                Today Race
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section - Responsive */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-center text-gray-900 font-bold z-10 px-4">
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-4xl uppercase leading-tight">
              Track <span className="text-primary">Pigeons</span>
              <br />
              Watch Live Results
            </h3>
          </div>
        </div>
        <Image
          src={"/pigeon_flying.webp"}
          alt="pigeon flying background"
          width={500}
          height={500}
          className="w-full object-cover h-32 sm:h-40 md:h-60 lg:h-80 xl:h-96 opacity-40"
        />
      </div>

      {/* Bottom CTA Cards - Responsive */}
      <div className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="p-6 sm:p-8 lg:p-10 rounded-lg bg-primary/10">
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-4">
                Are You Looking <br />
                for Loft Manager?
              </h3>
              <p className="text-gray-600 mb-6 text-sm sm:text-base max-w-sm">
                We are committed to providing our customers with exceptional
                service.
              </p>
              <Button className="w-full sm:w-auto">Get Started</Button>
            </div>
            <div className="p-6 sm:p-8 lg:p-10 rounded-lg bg-pink-100">
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-4">
                Best Place for <br />
                Pigeon Race
              </h3>
              <p className="text-gray-600 mb-6 text-sm sm:text-base max-w-sm">
                We are committed to providing our customers with exceptional
                service.
              </p>
              <Button className="w-full sm:w-auto">Get Started</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ListEventsComponent() {
  const { data, error, isError, isPending, isSuccess } = useListEvents({});
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
  if (isSuccess && data) {
    console.log(data);
    const events: ListEvents[] = data?.data?.events;
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <EventComponent event={event} key={event.idEvent} />
        ))}
      </div>
    );
  }
}
