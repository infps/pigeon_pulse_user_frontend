import { ListRaces } from "@/lib/types";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export default function RaceComponent({ race }: { race: ListRaces }) {
  console.log(race.date);
  return (
    <div className="w-full">
      <Link href={`/races/${race.id}`}>
        <div className="aspect-video relative rounded-lg overflow-hidden">
          <Image
            src={race.photoUrl || "/default.png"}
            alt="race-image"
            width={500}
            height={300}
            className="object-cover w-full h-full"
          />
          <div className="absolute top-2 left-2 bg-white p-1 w-max h-max text-[11px] rounded-lg z-50">
            <span>
              {race.status === "UPCOMING"
                ? "Registration Open"
                : race.status === "LIVE"
                ? "Live Now"
                : "Completed"}
            </span>
          </div>
        </div>
      </Link>
      <div className="mt-2">
        <p className="text-sm text-gray-500">
          {new Date(race.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <h3 className="text-lg font-semibold">{race.distanceKm} km</h3>
          <span className="text-sm text-gray-500">
            {race._count.entries} participants
          </span>
        </div>
        <p className="font-bold mt-1">{race.name}</p>
        {race.status === "UPCOMING" && (
          <Button
            variant={"outline"}
            asChild
            className="mt-2 border-2 border-primary"
          >
            <Link href={`/races/${race.id}/register`}>Register Now</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
