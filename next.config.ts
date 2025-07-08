import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['randomuser.me'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
