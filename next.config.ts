import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_CDN_BASE_URL: process.env.CDN_BASE_URL,
  },
};

export default nextConfig;
