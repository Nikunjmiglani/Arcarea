/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn.sanity.io',
      'miggla.vercel.app',
      'miggla.com',
      'www.miggla.com',
      'www.homemakersinterior.com',
    ],
  },
};

module.exports = nextConfig;
