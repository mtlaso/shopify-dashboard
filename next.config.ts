import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: undefined,
        hostname: "**"
      },
    ],
  },
} satisfies NextConfig;

export default nextConfig;
