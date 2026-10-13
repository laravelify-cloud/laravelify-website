// PM2 process for laravelify.cloud (used by deploy/deploy.sh).
const path = require('path');

module.exports = {
    apps: [
        {
            name: 'laravelify-website',
            cwd: path.join(__dirname, '..', '.next', 'standalone'),
            script: 'server.js',
            env: {
                NODE_ENV: 'production',
                PORT: 3000,
                HOSTNAME: '127.0.0.1',
            },
            max_memory_restart: '400M',
        },
    ],
};
