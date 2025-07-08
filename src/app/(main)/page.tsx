"use client";
import RaceComponent from "@/components/RaceComponent";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { listRaces } from "@/lib/api/race";
import { ListRaces } from "@/lib/types";
import Image from "next/image";
import React from "react";

export default function page() {
  const { data, error, isError, isPending, isSuccess } = listRaces({
    params: {
      status: "UPCOMING",
    },
  });
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError && error) {
    return <div>Error: {error.message}</div>;
  }
  if (isSuccess && !data) {
    return <div>Data not found</div>;
  }
  const races: ListRaces[] = data?.data || [];
  return (
    <div>
      <div className="bg-gradient-to-r from-white to-primary h-48 flex items-center px-10 sm:h-64 lg:h-96 relative">
        <div className="max-w-2xl">
          <h1 className="text-xl sm:text-4xl lg:text-5xl font-semibold tracking-wider uppercase">
            TRACK <span className="text-primary">PIGEONS</span>
            <br />
            WATCH LIVE RESULTS
          </h1>
          <p className="mt-4 font-light text-[11px] sm:text-sm lg:text-base">
            Experience the thrill of pigeon racing with real-time tracking and
            live results from competitions around the world.
          </p>
        </div>
        <Image
          src={"/pigeons_on_branch.png"}
          alt="pigones"
          width={300}
          height={300}
          className="absolute right-0 top-1/2 h-40 w-auto sm:h-48 lg:h-64 transform -translate-y-1/2"
        />
      </div>
      <div className="p-6 sm:p-8 lg:p-10">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
          Upcoming Races
        </h1>
        <Carousel className="overflow-hidden">
          <CarouselContent>
            {races.map((race) => (
              <CarouselItem
                key={race.id}
                className="md:basis-1/3 lg:basis-1/4 sm:basis-1/2"
              >
                <RaceComponent race={race} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-14 bg-primary text-white" />
          <CarouselNext className="mr-14 bg-primary text-white" />
        </Carousel>
      </div>

      {/* Live Pigeon Races Statistics Section */}
      <div className="bg-primary/10">
        <div className="">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <Image
                src={"/pigeon_flying.png"}
                alt="pigeon flying"
                width={500}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Live Pigeon Races
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">
                We are committed to providing our customers with exceptional
                service, competitive pricing, and a wide range of.
              </p>

              {/* Feature points */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700 text-sm sm:text-base">
                    We are the UK's largest provider, with more patrols in more
                    places
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700 text-sm sm:text-base">
                    You get 24/7 roadside assistance
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700 text-sm sm:text-base">
                    We fix 4 out of 5 cars at the roadside
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6 my-10">
        <div className="text-center">
          <div className="text-3xl sm:text-4xl lg:text-5xl font-medium text-gray-900 mb-2">
            836M
          </div>
          <div className="text-gray-600 text-sm sm:text-base">Total Race</div>
        </div>
        <div className="text-center">
          <div className="text-3xl sm:text-4xl lg:text-5xl font-medium text-gray-900 mb-2">
            738M
          </div>
          <div className="text-gray-600 text-sm sm:text-base">
            Total Loft Manager
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl sm:text-4xl lg:text-5xl font-medium text-gray-900 mb-2">
            100M
          </div>
          <div className="text-gray-600 text-sm sm:text-base">
            Races Per Day
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl sm:text-4xl lg:text-5xl font-medium text-gray-900 mb-2">
            238M
          </div>
          <div className="text-gray-600 text-sm sm:text-base">Today Race</div>
        </div>
      </div>
      <div className="relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-gray-900 font-bold text-lg sm:text-xl lg:text-4xl uppercase">
          Track <span className="text-primary">Pigeons</span>
          <br />
          Watch Live Results
        </div>
        <Image
          src={"/pigeon_flying.png"}
          alt="pigeon flying"
          width={500}
          height={500}
          className="w-full object-cover lg:h-[500px] md:h-96 h-40 opacity-40"
        />
      </div>
      <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 max-w-7xl mx-auto lg:grid-cols-2 gap-8 items-center">
        <div className="p-10 rounded-lg bg-primary/10">
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-4">
            Are You Looking <br />
            for Loft Manager?
          </h3>
          <p className="text-gray-600 mb-6 text-sm sm:text-base max-w-sm">
            We are committed to providing our customers with exceptional
            service.
          </p>
          <Button className="mt-8">Get Started</Button>
        </div>
        <div className="p-10 rounded-lg bg-pink-100">
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-4">
            Best Place for <br />
            Pigeon Race
          </h3>
          <p className="text-gray-600 mb-6 text-sm sm:text-base max-w-sm">
            We are committed to providing our customers with exceptional
            service.
          </p>
          <Button className="mt-8">Get Started</Button>
        </div>
      </div>
    </div>
  );
}
