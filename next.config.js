/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
