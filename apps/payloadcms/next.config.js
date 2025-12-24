import { withPayload } from '@payloadcms/next/withPayload'
import path from 'path'
import redirects from './redirects.js'

/** @type {import('next').NextConfig} */

const __dirname = import.meta.dirname

const nextConfig = {
  output: 'standalone',
  outputFileTracingRoot: path.join(__dirname, '../../'),
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        // Apply CORS headers to all API routes
        source: '/next/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: process.env.NEXT_PUBLIC_CLIENT_URL },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
        ],
      },
    ]
  },
  images: {
    remotePatterns: [
      ...[process.env.NEXT_PUBLIC_SERVER_URL, process.env.S3_ENDPOINT, process.env.IMAGE_BASE_URL]
        .filter((o) => o)
        .map((item) => {
          const url = new URL(item)

          return {
            hostname: url.hostname,
            protocol: url.protocol.replace(':', ''),
          }
        }),
    ],
  },
  reactStrictMode: true,
  redirects,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
