// PM2 process for laravelify.cloud (used by deploy/deploy.sh).
const fs = require('fs');
const path = require('path');

/**
 * Secrets for the running site (BMC_ACCESS_TOKEN, BMC_WEBHOOK_SECRET) from .env.production.local
 * in the repository. The file is not committed; `next build` reads the same file.
 */
function localEnv() {
    const file = path.join(__dirname, '..', '.env.production.local');

    if (!fs.existsSync(file)) {
        return {};
    }

    return Object.fromEntries(
        fs
            .readFileSync(file, 'utf8')
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter((line) => line !== '' && !line.startsWith('#') && line.includes('='))
            .map((line) => {
                const index = line.indexOf('=');

                return [line.slice(0, index).trim(), line.slice(index + 1).trim().replace(/^(['"])(.*)\1$/, '$2')];
            }),
    );
}

module.exports = {
    apps: [
        {
            name: 'laravelify-website',
            cwd: path.join(__dirname, '..', '.next', 'standalone'),
            script: 'server.js',
            env: {
                ...localEnv(),
                NODE_ENV: 'production',
                PORT: 3000,
                HOSTNAME: '127.0.0.1',
            },
            max_memory_restart: '400M',
        },
    ],
};
