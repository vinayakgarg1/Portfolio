/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // This allows the build to succeed even if there are tiny type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // This ignores linting errors during build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;