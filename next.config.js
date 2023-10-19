/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: 'standalone',
  images: {
    domains: [
      'important-rugby-shirt-colt.cyclic.app',
      'www.gettyimages.pt',
      'images.squarespace-cdn.com',
      'thumbs.dreamstime.com',
      'd27jswm5an3efw.cloudfront.net',
    ],
  },
};

module.exports = nextConfig;
