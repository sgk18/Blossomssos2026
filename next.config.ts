import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    cpus: 1,
  },
  distDir: process.env.NEXT_DIST_DIR || '.next',
};

export default nextConfig;
