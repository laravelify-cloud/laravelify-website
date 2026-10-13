import { site } from '@/config/site';

const groups = [
    { title: 'Backend', blurb: 'APIs, admin panels, and server apps', runs: 'PHP-FPM or PM2', items: ['Laravel', 'PHP', 'Express', 'NestJS', 'Node.js'] },
    { title: 'Frontend', blurb: 'Single-page apps and static sites, built once and served by nginx', runs: 'nginx', items: ['React', 'Vue.js', 'Angular', 'Svelte', 'Astro', 'Static HTML'] },
    { title: 'Full-stack', blurb: 'Frontend and server in one app', runs: 'PM2 or PHP-FPM', items: ['Next.js', 'Nuxt', 'SvelteKit', 'Laravel + Livewire', 'Laravel + Inertia'] },
];

export function Frameworks() {
    return (
        <section id="frameworks" className="border-t border-line py-24">
            <div className="container-page">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="eyebrow">Frameworks</p>
                    <h2 className="section-title mt-3">Deploy what you build, the way it should run</h2>
                    <p className="mt-4 text-lg text-muted">Pick Backend, Frontend, or Full-stack, search, and pin your favourites. No code yet? Start from a working example project.</p>
                </div>

                <div className="mt-14 grid gap-5 lg:grid-cols-3">
                    {groups.map((group) => (
                        <div key={group.title} className="card flex flex-col p-6">
                            <div className="flex items-center justify-between gap-3">
                                <h3 className="text-lg font-semibold">{group.title}</h3>
                                <span className="rounded-full border border-line px-2.5 py-0.5 text-[12px] text-faint">{group.runs}</span>
                            </div>
                            <p className="mt-1.5 text-[14px] text-muted">{group.blurb}</p>
                            <ul className="mt-5 flex flex-wrap gap-2">
                                {group.items.map((item) => (
                                    <li key={item} className="rounded-full border border-line bg-white/[0.02] px-3 py-1 text-sm text-dim">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <p className="mt-8 text-center text-[15px] text-muted">
                    Backend and frontend as separate sites? Create each one in the same group.{' '}
                    <a href={`${site.docsUrl}/websites/frameworks`} className="text-ink underline decoration-brand underline-offset-4">
                        Read the framework guide
                    </a>
                </p>
            </div>
        </section>
    );
}
