import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.DOMAIN!,
        //pathname: "/images/[...image]",
      },
      {
        protocol: "https",
        hostname: process.env.DOMAIN!,
        //pathname: "/images/[...image]",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        // pathname: "/images/[...image]",
      },
    ],
  },
};

export default nextConfig;
