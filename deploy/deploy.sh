#!/usr/bin/env bash
# Build and (re)start laravelify.cloud on the server. Run it from the repository:
#   bash deploy/deploy.sh
# First run starts the site under PM2; later runs pull, rebuild, and reload with no downtime.
set -euo pipefail

cd "$(dirname "$0")/.."

echo "→ Pulling the latest code"
git pull --ff-only

echo "→ Installing dependencies"
npm ci --no-audit --no-fund

echo "→ Building"
npm run build

# Next.js standalone output needs the static files next to server.js.
echo "→ Copying static files into the standalone build"
rm -rf .next/standalone/public .next/standalone/.next/static
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static

echo "→ Starting or reloading the site"
pm2 startOrReload deploy/ecosystem.config.cjs --update-env
pm2 save

echo "✓ laravelify.cloud is live on 127.0.0.1:3000"
