/** @type {import('next').NextConfig} */
const nextConfig = {
  // External packages that should be bundled with the server components
  serverExternalPackages: ['framer-motion'],
  
  // Don't use static export for dynamic routes
  // output: 'export',

  eslint: {
    ignoreDuringBuilds: true, // ✅ This skips ESLint errors during build
  },

  typescript: {
    ignoreBuildErrors: true, // Skip TypeScript errors during build
  },

  images: {
    domains: [
      'lh3.googleusercontent.com',
      'storage.googleapis.com',
      'www.gstatic.com',
      'encrypted-tbn0.gstatic.com',
      'images.pexels.com',
      'images.unsplash.com',
      'placehold.co',
      'via.placeholder.com',
      'picsum.photos',
      'fastly.picsum.photos'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: '**.gstatic.com',
      },
    ],
  },

  // Enable React Strict Mode
  reactStrictMode: true,
};

module.exports = nextConfig;
