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
    // Alternatively, you can specify domains directly:
    domains: ["images.pexels.com", "static.noroff.dev", "another-domain.com"],
  },
};

export default nextConfig;
