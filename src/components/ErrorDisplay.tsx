"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  error?: Error;
  onRetry?: () => void;
  showRetry?: boolean;
  showGoBack?: boolean;
  showGoHome?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function ErrorDisplay({
  title = "Something went wrong",
  message = "We encountered an unexpected error. Please try again.",
  error,
  onRetry,
  showRetry = true,
  showGoBack = true,
  showGoHome = true,
  className = "",
  size = "md"
}: ErrorDisplayProps) {
  const router = useRouter();

  const containerClasses = {
    sm: "p-4 space-y-4",
    md: "p-6 space-y-6", 
    lg: "p-8 space-y-8"
  };

  const titleClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl"
  };

  const messageClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };

  const iconClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20"
  };

  const iconSizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10"
  };

  return (
    <div className={`flex items-center justify-center min-h-[400px] ${className}`}>
      <div className={`max-w-md w-full text-center ${containerClasses[size]}`}>
        {/* Error Icon */}
        <div className="flex justify-center mb-4">
          <div className={`bg-red-100 rounded-full flex items-center justify-center ${iconClasses[size]}`}>
            <svg 
              className={`text-red-500 ${iconSizeClasses[size]}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 19c-.77.833.192 2.5 1.732 2.5z" 
              />
            </svg>
          </div>
        </div>

        {/* Error Text */}
        <div className="space-y-2 mb-6">
          <h2 className={`font-bold text-gray-900 ${titleClasses[size]}`}>
            {title}
          </h2>
          <p className={`text-gray-600 px-4 ${messageClasses[size]}`}>
            {message}
          </p>
        </div>

        {/* Error Details (in development) */}
        {process.env.NODE_ENV === 'development' && error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left mb-6">
            <h3 className="text-sm font-medium text-red-800 mb-2">Error Details:</h3>
            <p className="text-xs text-red-700 font-mono break-all">
              {error.message}
            </p>
            {error.stack && (
              <details className="mt-2">
                <summary className="text-xs text-red-600 cursor-pointer">Stack Trace</summary>
                <pre className="text-xs text-red-600 mt-1 overflow-auto">
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {showRetry && onRetry && (
            <Button 
              onClick={onRetry} 
              className="w-full sm:w-auto"
            >
              Try Again
            </Button>
          )}
          
          {showGoBack && (
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="w-full sm:w-auto"
            >
              Go Back
            </Button>
          )}
          
          {showGoHome && (
            <Button
              variant="secondary"
              onClick={() => router.push("/")}
              className="w-full sm:w-auto"
            >
              Go Home
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
