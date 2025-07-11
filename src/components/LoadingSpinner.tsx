import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  fullScreen?: boolean;
  className?: string;
}

export default function LoadingSpinner({ 
  size = "md", 
  message = "Loading...", 
  fullScreen = false,
  className = ""
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-12 w-12", 
    lg: "h-16 w-16"
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl"
  };

  const containerClasses = fullScreen 
    ? "flex items-center justify-center min-h-screen" 
    : "flex items-center justify-center p-8";

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className="flex flex-col items-center space-y-4">
        {/* Animated Spinner */}
        <div className="relative">
          <div className={`animate-spin rounded-full border-b-2 border-primary ${sizeClasses[size]}`}></div>
          {/* Inner spinning element for more visual appeal */}
          <div className={`absolute inset-0 animate-pulse rounded-full border-t-2 border-primary/30 ${sizeClasses[size]}`}></div>
        </div>
        
        {/* Loading Message */}
        <div className="text-center space-y-1">
          <p className={`${textSizes[size]} text-muted-foreground font-medium`}>
            {message}
          </p>
          <div className="flex space-x-1 justify-center">
            <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
