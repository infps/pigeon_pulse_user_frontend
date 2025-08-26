import ProfileSidebar from "@/components/ProfileSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col lg:flex-row p-4 sm:p-6 lg:p-10 gap-4 lg:gap-6">
      <ProfileSidebar />
      <div className="w-full max-w-5xl mx-auto">{children}</div>
    </div>
  );
}
