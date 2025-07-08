"use client";
import { signOut } from "@/lib/auth-client";
import useUserStore from "@/store/store";
import { ChevronRight, LogOut, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
export default function ProfileSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { setUserData } = useUserStore();
  const sidebarItems = [
    {
      name: "My Profile",
      href: "/profile",
      leftIcon: User,
      rightIcon: ChevronRight,
    },
    {
      name: "Own Lofts",
      href: "/profile/lofts",
      leftIcon: User,
      rightIcon: ChevronRight,
    },
    {
      name: "Shared Lofts",
      href: "/profile/shared-lofts",
      leftIcon: User,
      rightIcon: ChevronRight,
    },
    {
      name: "Races",
      href: "/profile/my-races",
      leftIcon: User,
      rightIcon: ChevronRight,
    },
    {
      name: "Payment",
      href: "/profile/payments",
      leftIcon: User,
      rightIcon: ChevronRight,
    },
  ];
  const handleLogout = async () => {
    const { data, error } = await signOut();
    if (error) {
      console.error("Logout failed:", error);
      return;
    }
    if (data) {
      setUserData(null, null);
      toast.success("Logout successful");
      router.push("/");
    }
  };
  return (
    <div className="w-full lg:w-64 lg:min-w-64">
      <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible">
        {sidebarItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`${
              (pathname === item.href ||
                (item.href !== "/profile" && pathname.startsWith(item.href))) &&
              "bg-secondary text-white"
            } flex items-center justify-between py-3 lg:py-4 px-3 lg:px-1 whitespace-nowrap flex-shrink-0 lg:flex-shrink min-w-fit lg:min-w-0`}
          >
            <div className="flex items-center gap-2">
              <item.leftIcon className="w-4 h-4 lg:w-5 lg:h-5" />
              <span className="text-sm lg:text-base">{item.name}</span>
            </div>
            <item.rightIcon className="w-4 h-4 lg:w-5 lg:h-5 hidden lg:block" />
          </Link>
        ))}
      </div>
      <div
        onClick={handleLogout}
        className="mt-4 flex items-center space-x-2 lg:space-x-4 p-3 lg:p-4 cursor-pointer"
      >
        <LogOut className="w-4 h-4 lg:w-5 lg:h-5" /> 
        <span className="text-sm lg:text-base">Logout</span>
      </div>
    </div>
  );
}
