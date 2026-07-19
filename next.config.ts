import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
    images: {
        loader: 'custom',
        loaderFile: './src/sanity/lib/image-loader.ts',
        deviceSizes: [480, 768, 1024, 1440, 1920],
    },
    turbopack: {
        root: path.join(__dirname, '..'),
    },
};

export default nextConfig;
