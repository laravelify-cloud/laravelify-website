import type { NextConfig } from 'next';
import { site } from './src/config/site';

const nextConfig: NextConfig = {
    // Laravelify deploys Next.js sites as a standalone build under PM2.
    output: 'standalone',
    poweredByHeader: false,

    async redirects() {
        return [
            // `curl -fsSL https://laravelify.cloud/install.sh | sudo bash` also works (curl -L follows this).
            { source: '/install.sh', destination: site.installScriptUrl, permanent: false },
            { source: '/docs', destination: site.docsUrl, permanent: false },
            { source: '/github', destination: site.repositoryUrl, permanent: false },
            { source: '/sponsor', destination: site.sponsorUrl, permanent: false },
        ];
    },
};

export default nextConfig;
