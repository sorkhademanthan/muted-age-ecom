/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['@headlessui/react', '@heroicons/react'],
  },
  // Enable strict mode for better development experience
  reactStrictMode: true,
};

export default nextConfig;
