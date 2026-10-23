import { Icon, type IconName } from './icon';

const features: { icon: IconName; title: string; text: string }[] = [
    { icon: 'rocket', title: 'Git push to deploy', text: 'GitHub App or token, webhooks, live build logs, one-click redeploys and cancel.' },
    { icon: 'layers', title: 'Backend, frontend, full-stack', text: 'Laravel, PHP, Express, NestJS, React, Vue, Angular, Svelte, Astro, Next.js, Nuxt, and SvelteKit, each run the way it should. No code yet? Start from an example project.' },
    { icon: 'backup', title: 'S3 backups', text: 'Databases one by one and folders with excludes, hourly or daily, to your own bucket. Restore a database, one table, or one folder.' },
    { icon: 'chart', title: 'Live monitoring', text: 'Requests, p95 response times, uptime, top routes, and a request feed that updates every 2 seconds.' },
    { icon: 'bug', title: 'Grouped issues', text: 'Laravel errors grouped by exception and line, with stack traces. Resolve, ignore, get told when they return.' },
    { icon: 'shield', title: 'Attack detection', text: 'SQL injection, XSS, path traversal, scanners, and attack tools flagged. Block an IP in one click.' },
    { icon: 'bell', title: 'Telegram alerts', text: 'Deploys, downtime, crashed workers, error spikes, slow responses, attacks, disk, and patches.' },
    { icon: 'pulse', title: 'Heartbeats', text: 'A ping URL for every cron job, and an alert the moment one stops running.' },
    { icon: 'cpu', title: 'Server monitoring', text: 'Live CPU, memory, load, and network, history up to 30 days, services, and top processes.' },
    { icon: 'cloud', title: 'Cloudflare tunnels', text: 'HTTPS without open ports. One tunnel serves many sites, and the server IP stays private.' },
    { icon: 'lock', title: 'Secure by default', text: 'One admin, two-factor required, secrets revealed only with your code. The panel runs as its own user, and each website runs as its own user.' },
    { icon: 'code', title: 'VS Code for every site', text: "A full VS Code in the browser, as the website's own user: extensions, terminal, Git, and debugger. Commit and push to deploy." },
    { icon: 'sparkle', title: 'AI agents in the editor', text: 'Chat with Claude Code, Cursor, or GitHub Copilot about your code. When one hits its limit, switch: the next one continues the task.' },
    { icon: 'broadcast', title: 'Live Server', text: 'Run npm run dev or your PHP app from VS Code and share it on a random HTTPS address. Pages refresh on save; the address goes when you stop.' },
    { icon: 'git', title: 'Environments and previews', text: 'Production and development side by side, each with its own branch, domain, and database. Preview any site on a random subdomain.' },
    { icon: 'terminal', title: 'Live terminal and tools', text: 'A real console for every site: answer prompts, Ctrl+C, Artisan and PM2 autocomplete. File manager with trash, logs, health checks.' },
    { icon: 'server', title: 'Database tool', text: 'Browse millions of rows in a fast grid, filter like a spreadsheet, edit with undo, follow foreign keys, run SQL, and read encrypted columns decrypted.' },
    { icon: 'git', title: 'Deployments board', text: 'Every website as a card with its latest deploy, commit, and time. Watch a build live, or deploy again in one click.' },
    { icon: 'plug', title: 'MCP for AI assistants', text: 'Connect Claude Code, Claude Desktop, or Cursor and ask it to deploy a repository, read a log, or set a variable.' },
    { icon: 'key', title: 'Site security', text: 'Hide from search engines, refuse AI and SEO crawlers, basic auth with open paths, blocked IPs.' },
];

export function Features() {
    return (
        <section id="features" className="border-t border-line py-24">
            <div className="container-page">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="eyebrow">Features</p>
                    <h2 className="section-title mt-3">Everything a server needs, in one panel</h2>
                    <p className="mt-4 text-lg text-muted">From the first push to the 3 a.m. alert. Built with Laravel, Livewire, and Tailwind, for people who ship Laravel, Node.js, and front ends.</p>
                </div>

                <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => (
                        <div key={feature.title} className="group bg-night p-6 transition hover:bg-[#0e0e11]">
                            <div className="grid size-10 place-items-center rounded-xl border border-line bg-white/[0.03] text-accent transition group-hover:border-brand/60 group-hover:bg-brand/10">
                                <Icon name={feature.icon} />
                            </div>
                            <h3 className="mt-4 font-semibold">{feature.title}</h3>
                            <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{feature.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
