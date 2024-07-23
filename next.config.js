/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: `http://${process.env.VERCEL_URL}/api`,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  swcMinify: true,
};

module.exports = nextConfig;
