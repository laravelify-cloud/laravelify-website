import Link from 'next/link';
import { site } from '@/config/site';
import { formatStars, githubStars } from '@/lib/github';
import { Icon } from './icon';
import { MobileMenu } from './mobile-menu';

export const navLinks = [
    { label: 'Frameworks', href: '/#frameworks' },
    { label: 'Features', href: '/#features' },
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'Sponsors', href: '/#sponsors' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Docs', href: site.docsUrl },
];

export async function Navbar() {
    const stars = await githubStars();

    return (
        <header className="sticky top-0 z-40 border-b border-line bg-night/75 backdrop-blur-xl">
            <nav className="container-page flex h-16 items-center gap-6" aria-label="Main">
                <Link href="/" className="flex shrink-0 items-center" aria-label={`${site.name} home`}>
                    <img src="/brand/logo-on-dark.svg" alt={site.name} className="h-7 w-auto" />
                </Link>

                <div className="hidden flex-1 items-center gap-1 md:flex">
                    {navLinks.map((link) => (
                        <a key={link.label} href={link.href} className="rounded-lg px-3 py-2 text-sm text-muted transition hover:text-ink">
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className="ml-auto hidden items-center gap-2 md:flex">
                    <a href={site.repositoryUrl} className="btn btn-ghost h-9 px-3 text-sm" aria-label="Star Laravelify on GitHub">
                        <Icon name="github" className="size-4" />
                        <span>GitHub</span>
                        {stars !== null && (
                            <span className="flex items-center gap-1 border-l border-line pl-2 text-muted">
                                <Icon name="star" className="size-3.5" /> {formatStars(stars)}
                            </span>
                        )}
                    </a>
                    <a href={site.quickstartUrl} className="btn btn-primary h-9 px-4 text-sm">
                        Get started
                    </a>
                </div>

                <MobileMenu links={navLinks} />
            </nav>
        </header>
    );
}
