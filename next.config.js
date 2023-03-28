/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['surveyplanner.pythonanywhere.com'],
  },
}

module.exports = nextConfig
