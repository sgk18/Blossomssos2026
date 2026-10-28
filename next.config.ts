import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  experimental: {
    cpus: 1,
  },
  distDir: process.env.NEXT_DIST_DIR || '.next',
  async redirects() {
    return [
      { source: '/team.html', destination: '/team', permanent: true },
      // 1. Legacy HTML pages mapped to modern App Router routes
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/events.html', destination: '/events', permanent: true },
      { source: '/schedule.html', destination: '/schedule', permanent: true },
      { source: '/winners.html', destination: '/', permanent: true },

      // 2. Legacy event HTML files mapped to category routes
      { source: '/event1.html', destination: '/events/art', permanent: true },
      { source: '/event2.html', destination: '/events/literary', permanent: true },
      { source: '/event3.html', destination: '/events/music', permanent: true },
      { source: '/event4.html', destination: '/events/theatre', permanent: true },
      { source: '/event5.html', destination: '/events/dance', permanent: true },

      // 3. Event aliases for event1-event5
      { source: '/events/event1', destination: '/events/art', permanent: true },
      { source: '/events/event2', destination: '/events/literary', permanent: true },
      { source: '/events/event3', destination: '/events/music', permanent: true },
      { source: '/events/event4', destination: '/events/theatre', permanent: true },
      { source: '/events/event5', destination: '/events/dance', permanent: true },

      // 4. Theatre / Theater spelling compatibility
      { source: '/events/theater', destination: '/events/theatre', permanent: true },
      { source: '/theater', destination: '/events/theatre', permanent: true },
      { source: '/theatre', destination: '/events/theatre', permanent: true },

      // 5. Direct discipline shortcuts
      { source: '/art', destination: '/events/art', permanent: true },
      { source: '/literary', destination: '/events/literary', permanent: true },
      { source: '/music', destination: '/events/music', permanent: true },
      { source: '/dance', destination: '/events/dance', permanent: true },

      // 6. Common festival shortcuts & aliases
      { source: '/results', destination: '/winners', permanent: true },
      { source: '/standings', destination: '/winners', permanent: true },
      { source: '/calendar', destination: '/schedule', permanent: true },
      { source: '/timings', destination: '/schedule', permanent: true },
      { source: '/rules', destination: '/events', permanent: true },
      { source: '/guidelines', destination: '/events', permanent: true },
    ];
  },
};

export default nextConfig;
