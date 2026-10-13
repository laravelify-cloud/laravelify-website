import { Icon, type IconName } from './icon';

const features: { icon: IconName; title: string; text: string }[] = [
    { icon: 'rocket', title: 'Git push to deploy', text: 'GitHub App or token, webhooks, live build logs, one-click redeploys and cancel.' },
    { icon: 'layers', title: 'Laravel and Next.js', text: 'PHP 8.0–8.5 with Supervisor workers and Reverb, or Node 20–24 standalone builds under PM2.' },
    { icon: 'chart', title: 'Live monitoring', text: 'Requests, p95 response times, uptime, top routes, and a request feed that updates every 2 seconds.' },
    { icon: 'bug', title: 'Grouped issues', text: 'Laravel errors grouped by exception and line, with stack traces. Resolve, ignore, get told when they return.' },
    { icon: 'shield', title: 'Attack detection', text: 'SQL injection, XSS, path traversal, scanners, and attack tools flagged. Block an IP in one click.' },
    { icon: 'bell', title: 'Telegram alerts', text: 'Deploys, downtime, crashed workers, error spikes, slow responses, attacks, disk, and patches.' },
    { icon: 'pulse', title: 'Heartbeats', text: 'A ping URL for every cron job, and an alert the moment one stops running.' },
    { icon: 'cpu', title: 'Server monitoring', text: 'Live CPU, memory, load, and network, history up to 30 days, services, and top processes.' },
    { icon: 'cloud', title: 'Cloudflare tunnels', text: 'HTTPS without open ports. One tunnel serves many sites, and the server IP stays private.' },
    { icon: 'lock', title: 'Secure by default', text: 'One admin, two-factor required, secrets revealed only with your code, least-privilege host access.' },
    { icon: 'terminal', title: 'Built-in tools', text: 'File manager, terminal with Artisan and PM2 autocomplete, logs, health checks, phpMyAdmin sign-in.' },
    { icon: 'key', title: 'Site security', text: 'Hide from search engines, refuse AI and SEO crawlers, basic auth with open paths, blocked IPs.' },
];

export function Features() {
    return (
        <section id="features" className="border-t border-line py-24">
            <div className="container-page">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="eyebrow">Features</p>
                    <h2 className="section-title mt-3">Everything a Laravel server needs, in one panel</h2>
                    <p className="mt-4 text-lg text-muted">From the first push to the 3 a.m. alert. Built with Laravel, Livewire, and Tailwind, for people who ship Laravel.</p>
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
