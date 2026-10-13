import { site } from '@/config/site';
import { Icon } from './icon';
import { InstallCommand } from './install-command';
import { PanelPreview } from './panel-preview';

export function Hero() {
    return (
        <section className="relative overflow-hidden">
            <div className="glow-purple pointer-events-none absolute inset-0" />
            <div className="grid-bg pointer-events-none absolute inset-0" />

            <div className="container-page relative pt-16 pb-12 text-center sm:pt-24">
                <a
                    href={site.repositoryUrl}
                    className="fade-up inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.03] py-1 pr-3 pl-1 text-[13px] text-dim transition hover:border-white/25"
                >
                    <span className="rounded-full bg-brand px-2 py-0.5 text-[11px] font-semibold text-white">Open source</span>
                    Free forever, MIT licensed, on your own server
                    <Icon name="arrow" className="size-3.5" />
                </a>

                <h1 className="fade-up mx-auto mt-7 max-w-4xl text-[clamp(2.4rem,7vw,4.6rem)] leading-[1.02] font-bold tracking-[-0.045em] [animation-delay:60ms]">
                    Deploy <span className="text-accent">Laravel</span> &amp; <span className="text-accent">Next.js</span>
                    <br className="hidden sm:block" /> to a server you own.
                </h1>

                <p className="fade-up mx-auto mt-6 max-w-2xl text-lg text-muted [animation-delay:120ms] sm:text-xl">
                    Laravelify is a self-hosted control panel: push to GitHub and your site deploys, then watch live traffic, errors, attacks, and server
                    load. No Docker, no per-seat pricing, no vendor lock-in.
                </p>

                <div className="fade-up mt-9 flex flex-wrap items-center justify-center gap-3 [animation-delay:180ms]">
                    <a href={site.quickstartUrl} className="btn btn-primary h-12 px-6 text-base">
                        <Icon name="rocket" className="size-[18px]" /> Get started
                    </a>
                    <a href={site.repositoryUrl} className="btn btn-ghost h-12 px-6 text-base">
                        <Icon name="github" className="size-[18px]" /> Star on GitHub
                    </a>
                </div>

                <div className="fade-up mx-auto mt-10 max-w-2xl [animation-delay:240ms]">
                    <p className="mb-3 text-[13px] text-faint">
                        One command on a fresh Ubuntu server. <span className="text-accent">Ready in about ten minutes.</span>
                    </p>
                    <InstallCommand />
                </div>
            </div>

            <div className="container-page relative pb-20">
                <div className="fade-up [animation-delay:320ms]">
                    <PanelPreview />
                </div>
            </div>
        </section>
    );
}
