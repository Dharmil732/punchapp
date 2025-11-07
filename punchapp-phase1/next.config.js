
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { appDir: true }, // ensures Next picks up /app
};
export default nextConfig;
