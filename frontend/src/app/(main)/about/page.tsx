import { Button } from "@/components/ui/button";
import Image from "next/image";

const teamMembers = [
  {
    name: "John Snow",
    role: "CEO",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Stark",
    role: "CTO",
    img: "https://randomuser.me/api/portraits/men/33.jpg",
  },
  {
    name: "Robert",
    role: "CMO",
    img: "https://randomuser.me/api/portraits/men/34.jpg",
  },
  {
    name: "Sansa",
    role: "Co-Founder",
    img: "https://randomuser.me/api/portraits/women/35.jpg",
  },
  {
    name: "Joffery",
    role: "Founding Engineer",
    img: "https://randomuser.me/api/portraits/men/36.jpg",
  },
  {
    name: "Arya",
    role: "Founding Engineer",
    img: "https://randomuser.me/api/portraits/women/37.jpg",
  },
];

export default function About() {
  return (
    <>
      <div className="flex items-center justify-center h-96 bg-gradient-to-r from-white to-primary text-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg text-gray-700">
            We are a team of passionate individuals dedicated to revolutionizing
            pigeon racing with cutting-edge technology and real-time tracking
            solutions.
          </p>
        </div>
      </div>
      <div className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="p-6 sm:p-8 lg:p-10 rounded-lg bg-primary/10">
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-4">
                Are You Looking <br />
                for Loft Manager?
              </h3>
              <p className="text-gray-600 mb-6 text-sm sm:text-base max-w-sm">
                We are committed to providing our customers with exceptional
                service.
              </p>
              <Button className="w-full sm:w-auto">Get Started</Button>
            </div>
            <div className="p-6 sm:p-8 lg:p-10 rounded-lg bg-pink-100">
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-4">
                Best Place for <br />
                Pigeon Race
              </h3>
              <p className="text-gray-600 mb-6 text-sm sm:text-base max-w-sm">
                We are committed to providing our customers with exceptional
                service.
              </p>
              <Button className="w-full sm:w-auto">Get Started</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
