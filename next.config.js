/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    GOOGLEPAGESPEED_APIKEY: process.env.GOOGLEPAGESPEED_APIKEY,
    MONDAY_SIGNING_SECRET: process.env.MONDAY_SIGNING_SECRET,
    FIREBASE_SERVICE_ACCOUNT: process.env.FIREBASE_SERVICE_ACCOUNT,
  }
}

module.exports = nextConfig
