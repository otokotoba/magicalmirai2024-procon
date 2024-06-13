/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src/**/*.ts', 'src/**/*.tsx'],
  },
  experimental: {
    optimizePackageImports: [
      '@mui/material',
      '@mui/icons-material',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
    ],
  },
  transpilePackages: ['three'],
};

export default nextConfig;
