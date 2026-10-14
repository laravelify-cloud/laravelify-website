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
| Sponsors and backers | `src/data/sponsors.ts` (logos in `public/sponsors/`); coffee supporters are saved from the Buy Me a Coffee webhook |
| Sections | `src/components/*` |
| Colors and fonts | `src/app/globals.css` |

## Buy Me a Coffee supporters

The Sponsors section shows supporters of [buymeacoffee.com/arshadarsh01](https://buymeacoffee.com/arshadarsh01), and every page has the floating coffee button.

Buy Me a Coffee has no API for reading supporters, only webhooks. So the site saves each supporter when the webhook arrives, in `storage/bmc-supporters.json` (not committed, kept across deploys). Only the name, the number of coffees, the message, and the membership level are saved: no email addresses and no amounts.

1. **Webhook:** Buy Me a Coffee → Settings → Webhooks → Create webhook.
   - Endpoint URL: `https://laravelify.cloud/api/buymeacoffee`
   - Events: `donation.created`, `donation.refunded`, `membership.started`, `membership.updated`, `membership.cancelled`, `membership.paused`, `recurring_donation.started`, `recurring_donation.updated`, `recurring_donation.cancelled` (extras, commissions, and wishlist events work too)
   - Copy the webhook's signing secret.
2. On the server, in the repository folder, create `.env.production.local` (never committed):

   ```bash
   BMC_WEBHOOK_SECRET=your-webhook-signing-secret
   ```

3. Run `bash deploy/deploy.sh` once, so the running site reads the secret.
4. On the webhook page, use **Send test event**. Test events are saved but hidden; add `BMC_SHOW_TEST_EVENTS=true` to the same file (and deploy again) to see them on the page while you check.

What the page shows:

- Members and monthly supporters first, then the latest 12 coffee supporters.
- Anonymous supporters show as "Someone", and a hidden message stays hidden.
- A refund removes the support; a cancelled or paused membership removes the member.

Supporters from before the webhook was set up are not sent by Buy Me a Coffee. To show them, add them to `storage/bmc-supporters.json` by hand, in the same format the webhook writes:

```json
{ "supporters": [
  { "key": "manual:1", "kind": "coffee", "name": "Alex", "coffees": 3, "note": "Keep it up!", "level": null, "createdAt": 1760400000, "test": false }
] }
```

`kind` is `coffee`, `member`, or `monthly`, and `createdAt` is a Unix time in seconds. Run `bash deploy/deploy.sh` after editing it.

If you deploy with Laravelify instead, add `BMC_WEBHOOK_SECRET` in the website's **Environment** tab, and set `BMC_DATA_FILE` to a file outside the release folder (for example `/var/www/laravelify-website-data/bmc-supporters.json`).

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
