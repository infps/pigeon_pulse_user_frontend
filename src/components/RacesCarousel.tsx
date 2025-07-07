"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
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
import { Button } from "./ui/button";

export function RacesCarousel() {
  const { data, isError, error, isSuccess, isPending } = listRaces({
    params: {},
  });
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  if (isPending) {
    return <div className="text-center">Loading...</div>;
  }

  const races: ListRaces[] = data?.data || [];
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {races.map((race) => (
          <CarouselItem key={race.id}>
            <div className="w-full h-96 bg-gradient-to-r  px-10 py-20 from-primary to-white">
              <h1 className="text-4xl font-bold text-white mb-10">
                {race.name}
              </h1>
              <Button className="text-xl font-light bg-transparent h-12 rounded-lg border-white border-2">
                Register Now
              </Button>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
