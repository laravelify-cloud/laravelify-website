import { site } from '@/config/site';
import { Icon } from './icon';

const columns = [
    {
        title: 'Product',
        links: [
            { label: 'Features', href: '/#features' },
            { label: 'How it works', href: '/#how-it-works' },
            { label: 'Releases', href: site.releasesUrl },
            { label: 'Sponsors', href: '/#sponsors' },
        ],
    },
    {
        title: 'Docs',
        links: [
            { label: 'Quickstart', href: site.quickstartUrl },
            { label: 'Installation', href: `${site.docsUrl}/installation/install` },
            { label: 'Updating', href: `${site.docsUrl}/installation/updating` },
            { label: 'Troubleshooting', href: `${site.docsUrl}/troubleshooting` },
        ],
    },
    {
        title: 'Community',
        links: [
            { label: 'GitHub', href: site.repositoryUrl },
            { label: 'Discussions', href: site.discussionsUrl },
            { label: 'Report a bug', href: site.issuesUrl },
            { label: 'Security', href: site.securityUrl },
        ],
    },
];

export function Footer() {
    return (
        <footer className="border-t border-line">
            <div className="container-page grid gap-10 py-14 md:grid-cols-[1.5fr_repeat(3,1fr)]">
                <div>
                    <img src="/brand/logo-on-dark.svg" alt={site.name} className="h-7 w-auto" />
                    <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{site.tagline}. Open source, self-hosted, and free.</p>
                    <a href={site.repositoryUrl} className="mt-5 inline-flex items-center gap-2 text-sm text-dim hover:text-ink">
                        <Icon name="github" className="size-4" /> {site.repository}
                    </a>
                </div>
                {columns.map((column) => (
                    <div key={column.title}>
                        <p className="text-sm font-semibold">{column.title}</p>
                        <ul className="mt-4 flex flex-col gap-2.5">
                            {column.links.map((link) => (
                                <li key={link.label}>
                                    <a href={link.href} className="text-sm text-muted transition hover:text-ink">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="border-t border-line">
                <div className="container-page flex flex-wrap items-center justify-between gap-3 py-6 text-[13px] text-faint">
                    <p>
                        © {new Date().getFullYear()} {site.name} contributors. Released under the MIT license.
                    </p>
                    <p>
                        v{site.version}
                        {site.beta && ' (beta)'}
                    </p>
                </div>
            </div>
        </footer>
    );
}
