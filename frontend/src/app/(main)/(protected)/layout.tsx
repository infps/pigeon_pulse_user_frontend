"use client";
import { AuthProvider } from "../../auth-provider";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider requireAuth={true}>
      <div>{children}</div>
    </AuthProvider>
  );
}
