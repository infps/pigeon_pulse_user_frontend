import Header from "@/components/Header";
import { AuthProvider } from "../auth-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider requireAuth={false}>
      <Header />
      {children}
    </AuthProvider>
  );
}
