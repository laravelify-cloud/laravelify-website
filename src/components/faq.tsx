import { site } from '@/config/site';

const questions = [
    {
        q: 'Is Laravelify really free?',
        a: 'Yes. It is open source under the MIT license, with every feature included. There is no paid plan and no cloud version: you run it on your own server. Sponsors fund development.',
    },
    {
        q: 'It is in beta. Can I use it in production?',
        a: 'Laravelify runs real sites today, but the beta can still change between versions. Try it on a fresh server first, keep backups, and report anything that breaks on GitHub.',
    },
    {
        q: 'What does my server need?',
        a: 'A fresh Ubuntu 22.04, 24.04, or 26.04 server with 2 GB of memory or more (4 GB recommended), root access, and a domain on Cloudflare with a tunnel.',
    },
    {
        q: 'How is it different from Coolify?',
        a: 'Laravelify is inspired by Coolify but focused on Laravel and Next.js, and it does not use Docker. Sites run on plain nginx, PHP-FPM, Supervisor, and PM2, which are lighter on small servers and familiar to Laravel developers.',
    },
    {
        q: 'Can I deploy more than one site?',
        a: 'As many as your server can hold. Each site has its own domain, PHP or Node version, database, workers, environment, and monitoring.',
    },
    {
        q: 'How do updates work?',
        a: 'One command: sudo bash /opt/laravelify/scripts/update.sh. It downloads the latest release from GitHub and keeps your data. Your sites keep running.',
    },
];

export function Faq() {
    return (
        <section id="faq" className="border-t border-line py-24">
            <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.6fr]">
                <div>
                    <p className="eyebrow">FAQ</p>
                    <h2 className="section-title mt-3">Questions</h2>
                    <p className="mt-4 text-muted">
                        Something else? Ask in{' '}
                        <a href={site.discussionsUrl} className="text-ink underline decoration-brand underline-offset-4">
                            GitHub Discussions
                        </a>{' '}
                        or read the{' '}
                        <a href={site.docsUrl} className="text-ink underline decoration-brand underline-offset-4">
                            docs
                        </a>
                        .
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    {questions.map((item) => (
                        <details key={item.q} className="card group p-5 [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                                {item.q}
                                <span className="grid size-6 shrink-0 place-items-center rounded-full border border-line text-faint transition group-open:rotate-45">+</span>
                            </summary>
                            <p className="mt-3 text-[15px] leading-relaxed text-muted">{item.a}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
