/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    reactStrictMode: false,
    experimental: {
        swcPlugins: [['@swc-jotai/react-refresh', {}]],
    }
}
