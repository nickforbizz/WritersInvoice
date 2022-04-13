/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  env:{
    GOOGLE_CLIENT_ID: '',
    GOOGLE_CLIENT_SECRET: '',
    SECRET: '',
  },
  images: {
    domains: ['google.com'],
  },
}

module.exports = nextConfig
