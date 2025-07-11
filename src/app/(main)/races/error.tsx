"use client";

import ErrorDisplay from "@/components/ErrorDisplay";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <ErrorDisplay
      title="Race Error"
      message="We encountered an error while loading race information. Please try again."
      error={error}
      onRetry={reset}
      size="md"
    />
  );
}
