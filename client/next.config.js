/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    GOOGLEPAGESPEED_APIKEY: process.env.GOOGLEPAGESPEED_APIKEY,
  }
}

module.exports = nextConfig
