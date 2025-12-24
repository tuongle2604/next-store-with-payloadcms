import type { NextConfig } from "next/types";
import path from "path";

const __dirname = import.meta.dirname;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname, "../../"),
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      { hostname: "localhost" },
      {
        hostname: process.env.IMAGE_DOMAIN || "",
      },
    ].filter((pattern) => pattern.hostname),
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    esmExternals: true,
    scrollRestoration: true,
    // ppr: true,
    // cpus: 1,
    // reactCompiler: true,
    inlineCss: true,
  },
};

export default nextConfig;
