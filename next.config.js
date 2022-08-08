/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["s3.marpple.co"],
  },
};

module.exports = nextConfig;
