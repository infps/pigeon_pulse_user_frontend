"use client";
import useUserStore from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [weather, setWeather] = useState<
    | {
        date: string;
        maxtemp_c: number;
        mintemp_c: number;
        condition: string;
        icon: string;
      }[]
    | null
  >(null);
  const [foreCastDay, setForeCastDay] = useState<string>("1");
  const weatherCacheRef = useRef<Record<string, any>>({});
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lon: number} | null>(null);

  const fetchWeatherData = useCallback(async (lat: number, lon: number, days: string) => {
    // Create cache key for location and forecast days
    const cacheKey = `${lat}-${lon}-${days}`;
    
    // Check if we have cached data for this combination
    if (weatherCacheRef.current[cacheKey]) {
      console.log("Using cached weather data:", weatherCacheRef.current[cacheKey]);
      setWeather(weatherCacheRef.current[cacheKey]);
      return;
    }

    const url = `https://api.weatherapi.com/v1/forecast.json?key=ff77f311fc10423e8c990536251207&q=${lat},${lon}&days=${Number(
      days
    )}&aqi=no&alerts=no`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      const weatherReport = data.forecast.forecastday.map((day: any) => ({
        date: day.date,
        maxtemp_c: day.day.maxtemp_c,
        mintemp_c: day.day.mintemp_c,
        condition: day.day.condition.text,
        icon: day.day.condition.icon,
      }));
      console.log("Weather data fetched from API:", weatherReport);
      
      // Cache the response
      weatherCacheRef.current[cacheKey] = weatherReport;
      
      setWeather(weatherReport);
    } catch (error) {
      console.error("Weather fetch error:", error);
    }
  }, []);

  // Effect to get user's location on component mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setCurrentLocation({ lat, lon });
      },
      (err) => {
        console.error("Location permission denied:", err);
      }
    );
  }, []);

  // Effect to fetch weather data when location or forecast days change
  useEffect(() => {
    if (currentLocation) {
      fetchWeatherData(currentLocation.lat, currentLocation.lon, foreCastDay);
    }
  }, [currentLocation, foreCastDay, fetchWeatherData]);

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
      <div className="flex items-center gap-4">
        {weather.map((day) => (
          <div
            key={day.date}
            className={`flex flex-col items-center ${className}`}
          >
            <Image
              src={`https:${day.icon}`}
              alt={day.condition}
              width={32}
              height={32}
            />
            <span className="text-xs text-gray-500">
              {day.maxtemp_c}°C / {day.mintemp_c}°C
            </span>
            <span className="text-sm font-medium">{day.date}</span>
          </div>
        ))}
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
          <Select value={foreCastDay} onValueChange={setForeCastDay}>
            <SelectTrigger className="border rounded-lg px-3 py-2">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Day</SelectItem>
              <SelectItem value="3">3 Days</SelectItem>
            </SelectContent>
          </Select>
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
