import { ChevronRight, LogOut, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function ProfileSidebar() {
  const pathname = usePathname();
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
  console.log(pathname);
  return (
    <div className="w-64">
      <div className="flex flex-col gap-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`${
              (pathname === item.href || 
               (item.href !== "/profile" && pathname.startsWith(item.href))) && 
              "bg-secondary text-white"
            } flex items-center justify-between py-4 px-1`}
          >
            <div className="flex items-center gap-2">
              <item.leftIcon className="w-5 h-5" />
              <span>{item.name}</span>
            </div>
            <item.rightIcon className="w-5 h-5" />
          </Link>
        ))}
      </div>
      <div className="mt-4 flex items-center space-x-4 p-4">
        <LogOut /> <span>Logout</span>
      </div>
    </div>
  );
}
