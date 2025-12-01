import MDX from "@next/mdx";
import type { NextConfig } from "next/types";
import path from "path";

const withMDX = MDX();
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
        // protocol: "https",
        hostname: process.env.S3_DOMAIN || "",
        // pathname: "/media/*",
      },
      {
        hostname: process.env.CLOUD_FRONT_DOMAIN || "",
      },
    ].filter((pattern) => pattern.hostname),
    formats: ["image/avif", "image/webp"],
  },
  // transpilePackages: ["next-mdx-remote", "commerce-kit"],
  experimental: {
    esmExternals: true,
    scrollRestoration: true,
    // ppr: true,
    // cpus: 1,
    // reactCompiler: true,
    // mdxRs: true,
    inlineCss: true,
  },
  // webpack: (config) => {
  //   return {
  //     ...config,
  //     resolve: {
  //       ...config.resolve,
  //       extensionAlias: {
  //         ".js": [".js", ".ts"],
  //         ".jsx": [".jsx", ".tsx"],
  //       },
  //     },
  //   };
  // },
  // rewrites: async () => [
  //   {
  //     source: "/stats/:match*",
  //     destination: "https://eu.umami.is/:match*",
  //   },
  // ],
};

export default withMDX(nextConfig);
