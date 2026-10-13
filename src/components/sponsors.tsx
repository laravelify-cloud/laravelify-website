import { site } from '@/config/site';
import { backers, sponsorTiers, type Sponsor, type SponsorTier } from '@/data/sponsors';
import { Icon } from './icon';

const tierStyle: Record<SponsorTier['id'], { grid: string; height: string; logo: string }> = {
    special: { grid: 'sm:grid-cols-2', height: 'h-32', logo: 'max-h-14' },
    gold: { grid: 'grid-cols-2 lg:grid-cols-4', height: 'h-24', logo: 'max-h-10' },
    silver: { grid: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6', height: 'h-20', logo: 'max-h-8' },
};

function SponsorCard({ sponsor, tier }: { sponsor: Sponsor; tier: SponsorTier }) {
    const style = tierStyle[tier.id];

    return (
        <a
            href={sponsor.url}
            target="_blank"
            rel="noopener sponsored"
            title={sponsor.description ? `${sponsor.name}: ${sponsor.description}` : sponsor.name}
            className={`card grid ${style.height} place-items-center px-6 transition hover:border-white/20 hover:bg-white/[0.04]`}
        >
            <img src={sponsor.logoDark ?? sponsor.logo} alt={sponsor.name} className={`${style.logo} w-auto max-w-full object-contain`} />
        </a>
    );
}

function EmptySlot({ tier }: { tier: SponsorTier }) {
    return (
        <a
            href={site.sponsorUrl}
            className={`grid ${tierStyle[tier.id].height} place-items-center rounded-2xl border border-dashed border-line-strong text-sm text-faint transition hover:border-accent/60 hover:text-accent`}
        >
            <span className="flex items-center gap-2">
                <Icon name="heart" className="size-4" /> Your logo here
            </span>
        </a>
    );
}

export function Sponsors() {
    return (
        <section id="sponsors" className="border-t border-line py-24">
            <div className="container-page">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="eyebrow">Sponsors</p>
                    <h2 className="section-title mt-3">Free and open source, thanks to our sponsors</h2>
                    <p className="mt-4 text-lg text-muted">
                        Laravelify has no paid plan and no cloud version. Sponsors fund the time that goes into new features, security fixes, and support.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <a href={site.sponsorUrl} className="btn btn-primary">
                            <Icon name="heart" className="size-4" /> Become a sponsor
                        </a>
                        <a href={`mailto:${site.sponsorEmail}`} className="btn btn-ghost">
                            Company sponsorship
                        </a>
                    </div>
                </div>

                <div className="mt-16 flex flex-col gap-12">
                    {sponsorTiers.map((tier) => {
                        // Fill the row up to the tier's slots, and always leave one open slot.
                        const empty = Math.max(1, tier.slots - tier.sponsors.length);

                        return (
                            <div key={tier.id}>
                                <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                                    <h3 className="text-sm font-semibold tracking-[0.08em] text-dim uppercase">{tier.title}</h3>
                                    <p className="text-[13px] text-faint">
                                        {tier.monthly} · {tier.blurb}
                                    </p>
                                </div>
                                <div className={`grid gap-3 ${tierStyle[tier.id].grid}`}>
                                    {tier.sponsors.map((sponsor) => (
                                        <SponsorCard key={sponsor.name} sponsor={sponsor} tier={tier} />
                                    ))}
                                    {Array.from({ length: empty }, (_, index) => (
                                        <EmptySlot key={index} tier={tier} />
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                    <div className="card flex flex-col items-center gap-5 p-8 text-center">
                        <h3 className="text-sm font-semibold tracking-[0.08em] text-dim uppercase">Backers</h3>
                        {backers.length > 0 ? (
                            <div className="flex flex-wrap justify-center gap-2">
                                {backers.map((login) => (
                                    <a key={login} href={`https://github.com/${login}`} title={login} target="_blank" rel="noopener">
                                        <img src={`https://github.com/${login}.png?size=96`} alt={login} className="size-11 rounded-full border border-line" loading="lazy" />
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <p className="max-w-md text-[15px] text-muted">Every monthly backer, from $5, gets their GitHub avatar here. Be the first.</p>
                        )}
                        <a href={site.sponsorUrl} className="text-sm font-medium text-accent hover:underline">
                            Back Laravelify on GitHub Sponsors →
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
