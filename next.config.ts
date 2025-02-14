import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.DOMAIN!,
        //pathname: "/images/[...image]",
      },
    ],
  },
};

export default nextConfig;
