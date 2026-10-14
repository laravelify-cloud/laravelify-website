import { site } from '@/config/site';
import { coffeeSupporters, type CoffeeSupporter } from '@/lib/buymeacoffee';
import { Icon } from './icon';

/** Coffee supporters shown on the page; the rest are counted below the list. */
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

function when(createdAt: number | null): string | null {
    return createdAt ? new Date(createdAt * 1000).toLocaleDateString('en', { month: 'short', year: 'numeric', timeZone: 'UTC' }) : null;
}

function what(supporter: CoffeeSupporter): string {
    if (supporter.kind === 'member') {
        return supporter.level ? `Member · ${supporter.level}` : 'Member';
    }

    if (supporter.kind === 'monthly') {
        return 'Supports every month';
    }

    return `Bought ${supporter.coffees === 1 ? 'a coffee' : `${supporter.coffees} coffees`}`;
}

function SupporterCard({ supporter }: { supporter: CoffeeSupporter }) {
    const date = when(supporter.createdAt);
    const anonymous = supporter.name === 'Someone';

    return (
        <li className={`card flex gap-3 p-4 ${supporter.kind !== 'coffee' ? 'border-accent/30' : ''}`}>
            <span
                className="grid size-10 shrink-0 place-items-center rounded-full text-sm font-semibold text-white"
                style={{ background: anonymous ? 'var(--color-raised)' : tone(supporter.name) }}
                aria-hidden="true"
            >
                {anonymous ? <Icon name="coffee" className="size-4 text-muted" /> : initials(supporter.name)}
            </span>
            <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-semibold text-ink" title={supporter.name}>
                    {supporter.name}
                </p>
                <p className={`mt-0.5 text-[13px] ${supporter.kind !== 'coffee' ? 'text-accent' : 'text-faint'}`}>
                    {what(supporter)}
                    {date && <span className="text-faint"> · {date}</span>}
                </p>
                {supporter.note && <p className="mt-2 line-clamp-3 text-sm text-muted">“{supporter.note}”</p>}
            </div>
        </li>
    );
}

export async function CoffeeSupporters() {
    const supporters = await coffeeSupporters();
    const regulars = supporters.filter((supporter) => supporter.kind !== 'coffee');
    const coffeeOnes = supporters.filter((supporter) => supporter.kind === 'coffee');
    const coffees = coffeeOnes.reduce((total, supporter) => total + supporter.coffees, 0);
    const people = supporters.length;

    return (
        <div className="card flex flex-col gap-6 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h3 className="flex items-center gap-2 text-sm font-semibold tracking-[0.08em] text-dim uppercase">
                        <Icon name="coffee" className="size-4 text-accent" /> Coffee supporters
                    </h3>
                    <p className="mt-1.5 text-[15px] text-muted">
                        {people === 0
                            ? 'A coffee keeps the late-night releases going. Be the first on this wall.'
                            : [
                                  regulars.length > 0 ? `${regulars.length} ${regulars.length === 1 ? 'member' : 'members'}` : null,
                                  coffees > 0 ? `${coffees === 1 ? 'a coffee' : `${coffees} coffees`} bought` : null,
                              ]
                                  .filter(Boolean)
                                  .join(', ')
                                  .replace(/^./, (first) => first.toUpperCase()) + '. Thank you!'}
                    </p>
                </div>
                <a href={site.coffeeUrl} target="_blank" rel="noopener" className="btn btn-primary">
                    <Icon name="coffee" className="size-4" /> Buy me a coffee
                </a>
            </div>

            {regulars.length > 0 && (
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {regulars.map((supporter) => (
                        <SupporterCard key={supporter.key} supporter={supporter} />
                    ))}
                </ul>
            )}

            {coffeeOnes.length > 0 && (
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {coffeeOnes.slice(0, shown).map((supporter) => (
                        <SupporterCard key={supporter.key} supporter={supporter} />
                    ))}
                </ul>
            )}

            {coffeeOnes.length > shown && (
                <p className="self-center text-sm text-muted">
                    and {coffeeOnes.length - shown} more {coffeeOnes.length - shown === 1 ? 'supporter' : 'supporters'}. Thank you all!
                </p>
            )}
        </div>
    );
}
