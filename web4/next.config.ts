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
  
  // Add this for Scanbot SDK WebAssembly files
  async headers() {
  return [
    {
      // Apply headers to all scanbot-sdk files and subdirectories
      source: '/scanbot-sdk/:path*',
      headers: [
        {
          key: 'Cross-Origin-Embedder-Policy',
          value: 'require-corp',
        },
        {
          key: 'Cross-Origin-Opener-Policy',
          value: 'same-origin',
        },
        {
          key: 'Cross-Origin-Resource-Policy',
          value: 'cross-origin',
        },
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ];
},

  // Optional: Webpack configuration for better WebAssembly support
  webpack: (config, { isServer }) => {
    // Important: return the modified config
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    return config;
  },

  // Increase body size limit for file uploads (uncomment if needed)
  // api: {
  //   bodyParser: {
  //     sizeLimit: '10mb',
  //   },
  // },
};

export default nextConfig;