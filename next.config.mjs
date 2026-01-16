/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'omtegar.vercel.app',
            }
        ],
    },
};

export default nextConfig;
