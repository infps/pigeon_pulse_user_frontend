"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useSession } from "@/lib/auth-client";
import useUserStore from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data, error, isPending } = useSession();
  const router = useRouter();
  const { setUserData } = useUserStore.getState();
  useEffect(() => {
    if (data) {
      setUserData(data.session, data.user);
    }
  }, [data]);
  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
