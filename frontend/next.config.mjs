// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
      NEXT_PUBLIC_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUD_NAME,
      NEXT_PUBLIC_UPLOAD_PRESET: process.env.NEXT_PUBLIC_UPLOAD_PRESET,
      NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    },
  };
  
  export default nextConfig;
  