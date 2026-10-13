import { site } from '@/config/site';

const steps = [
    {
        title: 'Install on your server',
        text: 'One command on a fresh Ubuntu server. It sets up nginx, PHP 8.0–8.5, MySQL, Redis, Node, PM2, Supervisor, Cloudflare, and a firewall.',
        code: site.installCommand,
    },
    {
        title: 'Connect GitHub and add a site',
        text: 'Create the GitHub App in one click, pick a repository and branch, and Laravelify writes the nginx, worker, and .env files for you.',
        code: 'Groups → production → New website → Laravel',
    },
    {
        title: 'Push to deploy',
        text: 'Every push builds and ships with a live log. Then watch traffic, errors, and attacks on the Monitoring tab, and get alerts in Telegram.',
        code: 'git push origin main',
    },
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="border-t border-line py-24">
            <div className="container-page">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="eyebrow">How it works</p>
                    <h2 className="section-title mt-3">From empty server to deployed in three steps</h2>
                </div>

                <ol className="mt-14 grid gap-5 lg:grid-cols-3">
                    {steps.map((step, index) => (
                        <li key={step.title} className="card flex flex-col p-6">
                            <span className="grid size-9 place-items-center rounded-full border border-line-strong font-mono text-sm font-semibold text-accent">{index + 1}</span>
                            <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
                            <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{step.text}</p>
                            <code className="mt-5 block overflow-x-auto rounded-lg border border-line bg-raised px-3 py-2.5 font-mono text-[12.5px] whitespace-nowrap text-dim">
                                {step.code}
                            </code>
                        </li>
                    ))}
                </ol>

                <p className="mt-8 text-center text-[15px] text-muted">
                    Full walkthrough in the{' '}
                    <a href={site.quickstartUrl} className="font-medium text-ink underline decoration-brand decoration-2 underline-offset-4 hover:decoration-accent">
                        quickstart guide
                    </a>
                    .
                </p>
            </div>
        </section>
    );
}
