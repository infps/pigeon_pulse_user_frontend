"use client";

import ErrorDisplay from "@/components/ErrorDisplay";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <ErrorDisplay
      title="Authentication Error"
      message="We encountered an error while processing your authentication. Please try again."
      error={error}
      onRetry={reset}
      showGoBack={false}
      size="md"
    />
  );
}
