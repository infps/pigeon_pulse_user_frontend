export default function Loading() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        <p className="text-base text-muted-foreground">Loading profile...</p>
      </div>
    </div>
  );
}
