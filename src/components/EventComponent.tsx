import { ListEvents } from "@/lib/types";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export default function EventComponent({ event }: { event: ListEvents }) {
  return (
    <div className="w-full">
      <Link href={`/events/${event.idEvent}`}>
        <div className="aspect-video relative rounded-lg overflow-hidden">
          <Image
            src={"/eventBanner.webp"}
            alt="event-image"
            width={500}
            height={300}
            className="object-cover w-full h-full"
          />
          <div className="absolute top-2 left-2 bg-white p-1 w-max h-max text-[11px] rounded-lg z-50">
            <span>
              {event.isOpen ? "Registration Open" : "CLOSED"}
            </span>
          </div>
        </div>
      </Link>
      <div className="mt-2">
        <p className="text-sm text-gray-500">
          {new Date(event.eventDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm text-gray-500">
            {event._count.eventInventories} participants
          </span>
        </div>
        <p className="font-bold mt-1">{event.eventName}</p>
        {event.isOpen && (
          <Button
            variant={"outline"}
            asChild
            className="mt-2 border-2 border-primary"
          >
            <Link href={`/events/${event.idEvent}/register`}>Register Now</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
