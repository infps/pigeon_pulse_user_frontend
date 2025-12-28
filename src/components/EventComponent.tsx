import { ListEvents } from "@/lib/types";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { Calendar, MapPin, Users } from "lucide-react";

export default function EventComponent({ event }: { event: ListEvents }) {
  const eventTypeLabel = event.eventType === 0 ? "AGN" : event.eventType === 1 ? "AS" : "Event";
  
  return (
    <div className="w-full border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/events/${event.idEvent}`}>
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={"/eventBanner.webp"}
            alt="event-image"
            width={500}
            height={300}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2 bg-white px-2 py-1 text-[11px] font-medium rounded-md shadow-sm">
            {event.isOpen ? "🟢 Registration Open" : "🔴 Closed"}
          </div>
          <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 text-[11px] font-medium rounded-md">
            {eventTypeLabel}
          </div>
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/events/${event.idEvent}`}>
          <h3 className="font-bold text-lg mb-2 hover:text-primary transition-colors line-clamp-2">
            {event.eventName}
          </h3>
        </Link>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-start gap-2">
            <Calendar className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-1">
              {new Date(event.eventDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 flex-shrink-0" />
            <span>{event._count.eventInventories} participants</span>
          </div>
        </div>
        <div className="mt-4">
          {event.isOpen ? (
            <Button
              variant="default"
              asChild
              className="w-full"
            >
              <Link href={`/events/${event.idEvent}/register`}>Register Now</Link>
            </Button>
          ) : (
            <Button
              variant="outline"
              asChild
              className="w-full"
            >
              <Link href={`/events/${event.idEvent}`}>View Details</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
