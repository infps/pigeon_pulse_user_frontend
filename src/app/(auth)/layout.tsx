export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-primary h-1/3 -rotate-6 scale-200 -z-50 w-full"></div>
      {children}
    </div>
  );
}
