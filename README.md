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
| Sponsors and backers | `src/data/sponsors.ts` (logos in `public/sponsors/`) |
| Sections | `src/components/*` |
| Colors and fonts | `src/app/globals.css` |

## Redirects

| URL | Goes to |
| --- | --- |
| `/install.sh` | `https://cdn.laravelify.cloud/install.sh` (so `curl -fsSL https://laravelify.cloud/install.sh \| sudo bash` works too) |
| `/docs` | `https://docs.laravelify.cloud` |
| `/github` | the GitHub repository |
| `/sponsor` | GitHub Sponsors |

## Deploy with Laravelify

This site is deployed by Laravelify itself, as a **Next.js** website:

- Domain: `laravelify.cloud`, Node 22, branch `main`, your Cloudflare tunnel.
- `output: 'standalone'` is already set in `next.config.ts`.
- Every push to `main` redeploys.
