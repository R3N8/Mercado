import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "static.noroff.dev",
      },
      {
        protocol: "https",
        hostname: "another-domain.com",
      },
    ],
  }
};

export default nextConfig;
