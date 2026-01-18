/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // Required for Docker deployment
  images: {
    domains: ["img.youtube.com"],
  },
};

module.exports = nextConfig;
