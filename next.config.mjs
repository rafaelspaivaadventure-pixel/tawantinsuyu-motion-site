/**
 * BASE_PATH is set only in the GitHub Actions workflow, so local development
 * at http://localhost:3001 keeps working with no prefix.
 */
const basePath = process.env.BASE_PATH || undefined;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath ?? "",
  },
};

export default nextConfig;
