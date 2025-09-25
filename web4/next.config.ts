import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /* config options here */
  images: {
    domains: [
      'localhost',
      'res.cloudinary.com', // If using Cloudinary
      'images.unsplash.com',
      'i.imgur.com'
    ],
    // Allow image optimization for local files during development
    ...(process.env.NODE_ENV === 'development' && {
      domains: ['localhost', '127.0.0.1'],
    }),
  },
  // Increase body size limit for file uploads
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default nextConfig;
