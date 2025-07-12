"use client";
import useUserStore from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [weather, setWeather] = useState<null | {
    temp_c: number;
    temp_f: number;
    condition: string;
    icon: string;
    wind_kph: number;
    wind_mph: number;
  }>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const url = `https://api.weatherapi.com/v1/current.json?key=ff77f311fc10423e8c990536251207&q=${lat},${lon}&aqi=no`;

        try {
          const res = await fetch(url);
          const data = await res.json();

          setWeather({
            temp_c: data.current.temp_c,
            temp_f: data.current.temp_f,
            condition: data.current.condition.text,
            icon: data.current.condition.icon, // already contains full path except https:
            wind_kph: data.current.wind_kph,
            wind_mph: data.current.wind_mph,
          });
        } catch (error) {
          console.error("Weather fetch error:", error);
        }
      },
      (err) => {
        console.error("Location permission denied:", err);
      }
    );
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Live Tracking", href: "/live-tracking" },
    { name: "Races", href: "/races" },
    { name: "Result", href: "/result" },
    { name: "About", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Delphi", href: "/delphi" },
  ];
  const { userData } = useUserStore();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const WeatherWidget = ({ className = "" }: { className?: string }) => {
    if (!weather) return null;

    return (
      <div className="flex items-center gap-2 w-max">
        <Image
          width={24}
          height={24}
          src={`https:${weather.icon}`}
          alt={weather.condition}
          className="w-6 h-6"
        />
        <span className="text-muted-foreground text-[11px] sm:text-sm text-wrap">
          {weather.temp_c}°C / {weather.temp_f}°F
        </span>
        <span className="text-muted-foreground text-[11px] sm:text-sm">
          | Wind: {weather.wind_kph} km/h ({weather.wind_mph} mph)
        </span>
      </div>
    );
  };

  return (
    <div className="relative bg-white">
      <div className="h-16 sm:h-20 flex items-center justify-between px-4 sm:px-6 lg:px-10 bg-white">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src={"/logo.png"}
              alt="logo"
              width={32}
              height={32}
              className="sm:w-10 sm:h-10"
            />
          </Link>
          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-5 ml-6 xl:ml-10">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-base xl:text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Weather and Auth Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <WeatherWidget />
          {userData.session ? (
            <Button asChild>
              <Link href={"/profile"}>Profile</Link>
            </Button>
          ) : (
            <div className="flex items-center gap-3 xl:gap-5">
              <Button asChild>
                <Link href={"/login"}>Login</Link>
              </Button>
              <Button variant={"outline"} asChild>
                <Link href={"/signup"}>Sign Up</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Weather and Menu Button */}
        <div className="lg:hidden flex items-center">
          <WeatherWidget />
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
          <div className="p-4 space-y-4">
            {/* Mobile Navigation */}
            <nav className="space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-base font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Auth Buttons */}
            <div className="pt-4 border-t border-gray-200">
              {userData.session ? (
                <Button asChild className="w-full">
                  <Link
                    href={"/profile"}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                </Button>
              ) : (
                <div className="space-y-3">
                  <Button asChild className="w-full">
                    <Link
                      href={"/login"}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </Button>
                  <Button variant={"outline"} asChild className="w-full">
                    <Link
                      href={"/signup"}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
