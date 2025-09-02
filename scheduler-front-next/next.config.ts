import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    output: "standalone",
    experimental: {
        serverActions: {
            allowedOrigins: ["localhost:3000", "193.181.209.159"],
        },
    },
};

export default nextConfig;
