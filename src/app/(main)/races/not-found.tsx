"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full text-center space-y-6">
        {/* 404 Image/Icon */}
        <div className="flex justify-center">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32">
            <Image
              src="/pigeon_flying.png"
              alt="Lost Pigeon"
              fill
              className="object-contain opacity-50"
              priority
            />
          </div>
        </div>

        {/* Error Text */}
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary/20">
            404
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Race Not Found
          </h2>
          <p className="text-gray-600 text-sm sm:text-base px-4">
            The race you're looking for doesn't exist or has been removed.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button 
            onClick={() => router.back()} 
            className="w-full sm:w-auto px-6 py-2"
          >
            Go Back
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/races")}
            className="w-full sm:w-auto px-6 py-2"
          >
            Browse Races
          </Button>
        </div>
      </div>
    </div>
  );
}
