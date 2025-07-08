import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "88d24a271371ddbedf4f3d60ceb504c8.r2.cloudflarestorage.com",
      },
      {
        protocol: "https",
        hostname: "pub-4652a58ef19e4e0199a5c7e3800b1503.r2.dev",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
    ],
  },
};

export default nextConfig;
