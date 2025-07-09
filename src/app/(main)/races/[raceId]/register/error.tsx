"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-red-500">!</h1>
          <h2 className="text-2xl font-bold text-gray-900">
            Something went wrong
          </h2>
          <p className="text-gray-600">
            We encountered an error while loading the race registration page.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-500">Error details:</p>
          <p className="text-xs bg-gray-100 p-2 rounded text-gray-700 font-mono">
            {error.message}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} className="w-full sm:w-auto">
            Try Again
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/races")}
            className="w-full sm:w-auto"
          >
            Back to Races
          </Button>
        </div>
      </div>
    </div>
  );
}
