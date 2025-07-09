export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero section skeleton */}
      <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-48 sm:h-64 lg:h-96 animate-pulse">
        <div className="flex items-center px-6 sm:px-10 h-full">
          <div className="max-w-2xl space-y-4">
            <div className="h-8 sm:h-12 lg:h-16 bg-gray-400 rounded-lg w-3/4"></div>
            <div className="h-6 sm:h-8 lg:h-10 bg-gray-400 rounded-lg w-1/2"></div>
          </div>
        </div>
      </div>

      {/* Countdown skeleton */}
      <div className="grid grid-cols-4 gap-6 p-6 sm:p-8 lg:p-10 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="text-center">
            <div className="h-8 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
          </div>
        ))}
      </div>

      {/* Header skeleton */}
      <div className="bg-gradient-to-r from-gray-300 to-gray-200 text-center py-4 animate-pulse">
        <div className="h-8 bg-gray-400 rounded w-1/3 mx-auto"></div>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Race Information skeleton */}
        <div className="p-6 sm:p-8 lg:p-10 w-full border-b animate-pulse">
          <div className="h-10 bg-gray-300 rounded mb-6 w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-12 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Owner Information skeleton */}
        <div className="p-6 sm:p-8 lg:p-10 w-full border-b animate-pulse">
          <div className="h-10 bg-gray-300 rounded mb-6 w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-12 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
