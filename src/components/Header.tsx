"use client";
import useUserStore from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export default function Header() {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
  ];
  const { userData } = useUserStore();
  return (
    <div className="h-20 flex items-center justify-between px-10 bg-white">
      <div className="flex items-center">
        <Image src={"/logo.png"} alt="logo" width={40} height={40} />
        <ul className="flex items-center gap-5 ml-10">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="text-lg font-semibold text-gray-700 hover:text-gray-900"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {userData.session ? (
        <Button asChild>
          <Link href={"/profile"}>Profile</Link>
        </Button>
      ) : (
        <div className="flex items-center gap-5">
          <Button asChild>
            <Link href={"/login"}>Login</Link>
          </Button>
          <Button variant={"outline"} asChild>
            <Link href={"/sign-up"}>Sign Up</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
