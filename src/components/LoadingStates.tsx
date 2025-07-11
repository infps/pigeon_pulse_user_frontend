import React from "react";
import LoadingSpinner from "./LoadingSpinner";

interface TableLoadingProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export function TableLoading({ rows = 5, columns = 4, className = "" }: TableLoadingProps) {
  return (
    <div className={`animate-pulse ${className}`}>
      {/* Table Header */}
      <div className="grid gap-4 p-4 border-b" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded"></div>
        ))}
      </div>
      
      {/* Table Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid gap-4 p-4 border-b" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div key={colIndex} className="h-4 bg-gray-100 rounded"></div>
          ))}
        </div>
      ))}
    </div>
  );
}

interface CardLoadingProps {
  count?: number;
  className?: string;
}

export function CardLoading({ count = 3, className = "" }: CardLoadingProps) {
  return (
    <div className={`grid gap-4 sm:gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow border">
            {/* Header */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2"></div>
              </div>
            </div>
            
            {/* Content */}
            <div className="space-y-3">
              <div className="h-3 bg-gray-100 rounded"></div>
              <div className="h-3 bg-gray-100 rounded w-5/6"></div>
              <div className="h-3 bg-gray-100 rounded w-4/6"></div>
            </div>
            
            {/* Footer */}
            <div className="mt-4 flex justify-between items-center">
              <div className="h-8 w-20 bg-gray-200 rounded"></div>
              <div className="h-6 w-16 bg-gray-100 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

interface FormLoadingProps {
  fields?: number;
  className?: string;
}

export function FormLoading({ fields = 4, className = "" }: FormLoadingProps) {
  return (
    <div className={`animate-pulse space-y-4 sm:space-y-6 ${className}`}>
      {Array.from({ length: fields }).map((_, index) => (
        <div key={index} className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-100 rounded w-full"></div>
        </div>
      ))}
      
      {/* Buttons */}
      <div className="flex space-x-3 pt-4">
        <div className="h-10 w-24 bg-gray-200 rounded"></div>
        <div className="h-10 w-20 bg-gray-100 rounded"></div>
      </div>
    </div>
  );
}

interface ListLoadingProps {
  items?: number;
  showAvatar?: boolean;
  className?: string;
}

export function ListLoading({ items = 5, showAvatar = true, className = "" }: ListLoadingProps) {
  return (
    <div className={`animate-pulse space-y-3 ${className}`}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded border">
          {showAvatar && <div className="w-10 h-10 bg-gray-200 rounded-full"></div>}
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-100 rounded w-1/2"></div>
          </div>
          <div className="h-6 w-16 bg-gray-100 rounded"></div>
        </div>
      ))}
    </div>
  );
}

interface StatsLoadingProps {
  count?: number;
  className?: string;
}

export function StatsLoading({ count = 4, className = "" }: StatsLoadingProps) {
  return (
    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse bg-white p-4 sm:p-6 rounded-lg shadow border text-center">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-100 rounded w-1/2 mx-auto"></div>
        </div>
      ))}
    </div>
  );
}

// Combined loading state component
interface PageLoadingProps {
  type: 'table' | 'cards' | 'form' | 'list' | 'stats' | 'custom';
  message?: string;
  fullScreen?: boolean;
  [key: string]: any; // For passing props to specific loading components
}

export function PageLoading({ type, message, fullScreen = false, ...props }: PageLoadingProps) {
  const content = () => {
    switch (type) {
      case 'table':
        return <TableLoading {...props} />;
      case 'cards':
        return <CardLoading {...props} />;
      case 'form':
        return <FormLoading {...props} />;
      case 'list':
        return <ListLoading {...props} />;
      case 'stats':
        return <StatsLoading {...props} />;
      case 'custom':
        return <LoadingSpinner message={message} fullScreen={fullScreen} {...props} />;
      default:
        return <LoadingSpinner message={message} fullScreen={fullScreen} />;
    }
  };

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {content()}
      </div>
    );
  }

  return content();
}
