/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "s3.marpple.co",
      "ablind-s3-bucket.s3.ap-northeast-2.amazonaws.com",
      "image.cine21.com",
    ],
  },
};

module.exports = nextConfig;
