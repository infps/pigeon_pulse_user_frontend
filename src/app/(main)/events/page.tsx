"use client";
import EventComponent from "@/components/EventComponent";
import { Button } from "@/components/ui/button";
import { useListEvents } from "@/lib/api/event";
import { Event } from "@/lib/types";
import React from "react";

export default function page() {
  const { data, error, isError, isPending, isSuccess } = useListEvents({});
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError && error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }
  const events: Event[] = data?.data?.events || [];

  return (
    <div>
      <div className="bg-gradient-to-r from-white to-primary h-48 flex items-center px-10 sm:h-64 lg:h-96 relative">
        <div className="max-w-2xl">
          <h1 className="text-xl sm:text-4xl lg:text-5xl font-semibold tracking-wider uppercase">
            Chasing the sky one feather at a time
          </h1>
        </div>
        {/* <Image
          src={"/pigeons_on_branch.png"}
          alt="pigones"
          width={300}
          height={300}
          className="absolute right-0 top-1/2 h-40 w-auto sm:h-48 lg:h-64 transform -translate-y-1/2"
        /> */}
      </div>
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Events</h2>
        </div>
        {events.length === 0 && (
          <div className="text-center text-gray-500">No Races Found</div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <EventComponent key={event.id} event={event} />
          ))}
        </div>
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
