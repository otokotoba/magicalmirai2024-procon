/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src/**/*.ts', 'src/**/*.tsx'],
  },
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },
};

export default nextConfig;
