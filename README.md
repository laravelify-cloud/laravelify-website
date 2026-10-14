# laravelify.cloud

The website at **https://laravelify.cloud**: a Next.js 16 + Tailwind 4 landing page with the install command, features, sponsors, and FAQ.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (standalone)
```

## Change things

| What | Where |
| --- | --- |
| GitHub repository, version, beta flag, docs and install URLs | `src/config/site.ts` |
| Sponsors and backers | `src/data/sponsors.ts` (logos in `public/sponsors/`); coffee supporters come from the Buy Me a Coffee API |
| Sections | `src/components/*` |
| Colors and fonts | `src/app/globals.css` |

## Buy Me a Coffee supporters

The Sponsors section lists supporters from [buymeacoffee.com/arshadarsh01](https://buymeacoffee.com/arshadarsh01), and every page has the floating coffee button.

1. **Token:** Buy Me a Coffee → Integrations → Developer dashboard → create an API token.
2. **Webhook:** Integrations → Webhooks → Create webhook. Endpoint URL `https://laravelify.cloud/api/buymeacoffee`, events: new supporter (and refunds). Copy its secret.
3. On the server, in the repository folder, create `.env.production.local` (never committed):

   ```bash
   BMC_ACCESS_TOKEN=your-api-token
   BMC_WEBHOOK_SECRET=your-webhook-secret
   ```

4. Run `bash deploy/deploy.sh` once. The build and PM2 both read the file.

The list is cached for an hour, and a signed webhook call refreshes it at once. Private supports show as "Someone" without their message; refunded ones are left out. Without a token the section shows a "Buy me a coffee" invitation.
If you deploy with Laravelify instead, put the two values in the website's **Environment** tab.

## Redirects

| URL | Goes to |
| --- | --- |
| `/install.sh` | `https://cdn.laravelify.cloud/install.sh` (so `curl -fsSL https://laravelify.cloud/install.sh \| sudo bash` works too) |
| `/docs` | `https://docs.laravelify.cloud` |
| `/github` | the GitHub repository |
| `/sponsor` | GitHub Sponsors |

## Deploy on a plain Ubuntu server

`deploy/` has everything: `deploy.sh` (pull, build, reload), `ecosystem.config.cjs` (PM2), and `nginx.conf`.
After the first setup, every update is:

```bash
cd /var/www/laravelify-website && bash deploy/deploy.sh
```

## Deploy with Laravelify

This site is deployed by Laravelify itself, as a **Next.js** website:

- Domain: `laravelify.cloud`, Node 22, branch `main`, your Cloudflare tunnel.
- `output: 'standalone'` is already set in `next.config.ts`.
- Every push to `main` redeploys.
