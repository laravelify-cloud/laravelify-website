import { site } from '@/config/site';
import { Icon, type IconName } from './icon';
import { InstallCommand } from './install-command';

const reasons: { icon: IconName; title: string; text: string }[] = [
    { icon: 'wallet', title: 'No per-seat pricing', text: 'One VPS hosts many sites. You pay your provider, not a platform per app, per user, or per build minute.' },
    { icon: 'lock', title: 'Your data stays yours', text: 'Code, databases, logs, and metrics never leave your server. Nothing phones home.' },
    { icon: 'plug', title: 'No lock-in', text: 'Plain nginx, PHP-FPM, Supervisor, and PM2 files you can read and edit. Leave any time; your sites keep running.' },
    { icon: 'server', title: 'Any provider', text: 'Hetzner, DigitalOcean, AWS, a box under your desk. If it runs Ubuntu, it runs Laravelify.' },
];

export function WhySelfHost() {
    return (
        <section className="relative overflow-hidden border-t border-line py-24">
            <div className="glow-yellow pointer-events-none absolute inset-0" />
            <div className="container-page relative">
                <div className="text-center">
                    <h2 className="text-[clamp(2.2rem,5vw,3.5rem)] font-bold tracking-[-0.04em]">
                        Why should you self-host<span className="text-accent">?</span>
                    </h2>
                    <p className="mt-3 text-lg text-muted">You stay in control. And it costs less.</p>
                </div>

                <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {reasons.map((reason) => (
                        <div key={reason.title} className="card p-6">
                            <Icon name={reason.icon} className="size-6 text-accent" />
                            <h3 className="mt-4 font-semibold">{reason.title}</h3>
                            <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{reason.text}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-14 flex flex-col items-center">
                    <a href={site.quickstartUrl} className="btn btn-primary h-12 px-6 text-base">
                        <Icon name="rocket" className="size-[18px]" /> Get started
                    </a>
                    <div className="mt-10 w-full max-w-3xl">
                        <p className="mb-3 text-[13px] text-faint">
                            The self-hosted version is ready on your server in minutes, <span className="text-accent">always free, with every feature</span>.
                        </p>
                        <InstallCommand />
                    </div>
                </div>
            </div>
        </section>
    );
}
