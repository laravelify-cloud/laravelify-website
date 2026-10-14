import { site } from '@/config/site';
import { coffeeSupporters, type CoffeeSupporter } from '@/lib/buymeacoffee';
import { Icon } from './icon';

/** Supporters shown on the page; the rest are on Buy Me a Coffee. */
const shown = 12;

const avatarTones = ['#6b16ed', '#8b5cf6', '#bd5fff', '#f59e0b', '#22c55e', '#0ea5e9', '#ef4444', '#14b8a6'];

function initials(name: string): string {
    const parts = name.split(/\s+/).filter(Boolean);

    return ((parts[0]?.[0] ?? '?') + (parts.length > 1 ? (parts[parts.length - 1][0] ?? '') : '')).toUpperCase();
}

function tone(name: string): string {
    let hash = 0;

    for (const char of name) {
        hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
    }

    return avatarTones[hash % avatarTones.length];
}

function when(createdAt: string | null): string | null {
    const date = createdAt ? new Date(createdAt.replace(' ', 'T')) : null;

    return date && !Number.isNaN(date.getTime()) ? date.toLocaleDateString('en', { month: 'short', year: 'numeric' }) : null;
}

function SupporterCard({ supporter }: { supporter: CoffeeSupporter }) {
    const date = when(supporter.createdAt);

    return (
        <li className="card flex gap-3 p-4">
            <span
                className="grid size-10 shrink-0 place-items-center rounded-full text-sm font-semibold text-white"
                style={{ background: supporter.name === 'Someone' ? 'var(--color-raised)' : tone(supporter.name) }}
                aria-hidden="true"
            >
                {supporter.name === 'Someone' ? <Icon name="coffee" className="size-4 text-muted" /> : initials(supporter.name)}
            </span>
            <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-semibold text-ink" title={supporter.name}>
                    {supporter.name}
                </p>
                <p className="mt-0.5 text-[13px] text-faint">
                    Bought {supporter.coffees === 1 ? 'a coffee' : `${supporter.coffees} coffees`}
                    {date && ` · ${date}`}
                </p>
                {supporter.note && <p className="mt-2 line-clamp-3 text-sm text-muted">“{supporter.note}”</p>}
            </div>
        </li>
    );
}

export async function CoffeeSupporters() {
    const supporters = await coffeeSupporters();
    const coffees = supporters.reduce((total, supporter) => total + supporter.coffees, 0);

    return (
        <div className="card flex flex-col gap-6 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h3 className="flex items-center gap-2 text-sm font-semibold tracking-[0.08em] text-dim uppercase">
                        <Icon name="coffee" className="size-4 text-accent" /> Coffee supporters
                    </h3>
                    <p className="mt-1.5 text-[15px] text-muted">
                        {supporters.length > 0
                            ? `${supporters.length} ${supporters.length === 1 ? 'person has' : 'people have'} bought ${coffees === 1 ? 'a coffee' : `${coffees} coffees`} for Laravelify. Thank you!`
                            : 'A coffee keeps the late-night releases going. Be the first on this wall.'}
                    </p>
                </div>
                <a href={site.coffeeUrl} target="_blank" rel="noopener" className="btn btn-primary">
                    <Icon name="coffee" className="size-4" /> Buy me a coffee
                </a>
            </div>

            {supporters.length > 0 && (
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {supporters.slice(0, shown).map((supporter) => (
                        <SupporterCard key={supporter.id} supporter={supporter} />
                    ))}
                </ul>
            )}

            {supporters.length > shown && (
                <a href={site.coffeeUrl} target="_blank" rel="noopener" className="self-center text-sm font-medium text-accent hover:underline">
                    See all {supporters.length} supporters on Buy Me a Coffee →
                </a>
            )}
        </div>
    );
}
