/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    // Desabilite recursos experimentais se estiver usando
    experimental: {
        appDir: false,
    },
};

export default nextConfig;
