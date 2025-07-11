"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-6">
        {/* 404 Image/Icon */}
        <div className="flex justify-center">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40">
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
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-primary/20">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Page Not Found
          </h2>
          <p className="text-gray-600 text-sm sm:text-base px-4">
            Oops! The page you're looking for seems to have flown away like our pigeons. 
            Let's get you back on track.
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
            onClick={() => router.push("/")}
            className="w-full sm:w-auto px-6 py-2"
          >
            Go Home
          </Button>
        </div>

        {/* Additional Links */}
        <div className="pt-6 space-y-2">
          <p className="text-sm text-gray-500">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <button 
              onClick={() => router.push("/races")}
              className="text-primary hover:underline"
            >
              Browse Races
            </button>
            <button 
              onClick={() => router.push("/about")}
              className="text-primary hover:underline"
            >
              About Us
            </button>
            <button 
              onClick={() => router.push("/contact")}
              className="text-primary hover:underline"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
