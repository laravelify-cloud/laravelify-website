<p align="center">
  <a href="https://laravelify.cloud">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/laravelify-cloud/laravelify/main/brand/laravelify-brand-assets/04-social/png/laravelify-readme-banner-dark-1600.png">
      <img alt="laravelify.cloud" src="https://raw.githubusercontent.com/laravelify-cloud/laravelify/main/brand/laravelify-brand-assets/04-social/png/laravelify-readme-banner-light-1600.png">
    </picture>
  </a>
</p>

<p align="center">
  <a href="https://laravelify.cloud"><b>laravelify.cloud</b></a> ·
  <a href="https://laravelify.cloud/#install">Install command builder</a> ·
  <a href="https://docs.laravelify.cloud">Docs</a> ·
  <a href="https://github.com/laravelify-cloud/laravelify">Panel repository</a>
</p>

# laravelify.cloud

The website at **[laravelify.cloud](https://laravelify.cloud)**, the home of [Laravelify](https://github.com/laravelify-cloud/laravelify), the open-source self-hosted deployment panel. It is a **Next.js 16 + React 19 + Tailwind 4** site, deployed by Laravelify itself.

## What is on the page

| Section | Component | What it shows |
| --- | --- | --- |
| Hero | `hero.tsx`, `install-command.tsx`, `panel-preview.tsx` | The pitch, the one-line install command with a copy button, and a preview of the panel |
| Works with | `app/page.tsx` | The frameworks and tools Laravelify runs |
| Frameworks | `frameworks.tsx` | Every app type, and how each one runs on the server |
| Features | `features.tsx` | Deploys, database tool, backups, monitoring, alerts, security, tools |
| How it works | `how-it-works.tsx` | Install, connect GitHub, push to deploy |
| **Install command builder** | `install-builder.tsx` | Pick the PHP-FPM and Node.js versions (and, optionally, the domains), copy the generated command, and see the steps the installer will show |
| Why self-host | `why-self-host.tsx` | Why to run your apps on your own server |
| Sponsors | `sponsors.tsx`, `coffee-supporters.tsx` | Sponsor tiers, sponsors, and Buy Me a Coffee supporters |
| FAQ | `faq.tsx` | Common questions |

## Install command builder

The **Install** section (`/#install`) builds a personal install command. Visitors tick the PHP-FPM versions (8.0 to 8.5) and Node.js versions (20, 22, 24) they need and can type their panel and phpMyAdmin domains. The command changes as they click:

```bash
curl -fsSL https://cdn.laravelify.cloud/install.sh | sudo bash -s -- --php=8.3,8.4 --node=22,24 --panel-domain=panel.example.com
```

- With the defaults it shows the plain command, `curl -fsSL https://cdn.laravelify.cloud/install.sh | sudo bash`.
- The panel needs PHP 8.3 or newer, so 8.4 is added when none of 8.3, 8.4, 8.5 is ticked (the installer does the same).
- The MySQL root password and the Cloudflare tunnel token have no field on purpose: the installer asks for them on the server, so they never end up in a copied command.
- The options are the installer's own (`scripts/install.sh` in the panel repository, `--help` lists them). Keep the two in step when an option changes.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # TypeScript
npm run build      # production build (output: standalone)
```

## Change things

| What | Where |
| --- | --- |
| GitHub repository, version, beta flag, docs and install URLs, the install command | `src/config/site.ts` |
| Sponsors and backers | `src/data/sponsors.ts` (logos in `public/sponsors/`); coffee supporters are saved from the Buy Me a Coffee webhook |
| Sections | `src/components/*`, put in order in `src/app/page.tsx` |
| Navigation links | `src/components/navbar.tsx` |
| Colors and fonts | `src/app/globals.css` (Tailwind 4 `@theme`) |
| SEO | `src/app/layout.tsx` (metadata), `src/app/sitemap.ts`, `src/app/robots.ts` |

The version in `src/config/site.ts` is shown in the beta banner and the hero badge. Update it with each panel release.

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
