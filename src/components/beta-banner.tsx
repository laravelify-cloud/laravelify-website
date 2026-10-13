import { site } from '@/config/site';
import { Icon } from './icon';

export function BetaBanner() {
    if (!site.beta) {
        return null;
    }

    return (
        <div className="border-b border-line bg-[linear-gradient(90deg,rgb(107_22_237/0.22),rgb(252_212_82/0.08))]">
            <a
                href={site.releasesUrl}
                className="container-page flex min-h-9 items-center justify-center gap-2 py-1.5 text-center text-[13px] text-dim transition hover:text-ink"
            >
                <span className="rounded-full bg-accent px-2 py-px text-[11px] font-bold tracking-wide text-night uppercase">Beta</span>
                <span>
                    Laravelify is in public beta (v{site.version}). Try it on a test server and tell us what breaks.
                </span>
                <Icon name="arrow" className="size-3.5 shrink-0" />
            </a>
        </div>
    );
}
