'use client';

import { useState } from 'react';
import { site } from '@/config/site';
import { Icon } from './icon';

export function MobileMenu({ links }: { links: { label: string; href: string }[] }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="ml-auto md:hidden">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="grid size-10 place-items-center rounded-lg text-dim hover:bg-white/5"
                aria-expanded={open}
                aria-label={open ? 'Close menu' : 'Open menu'}
            >
                <Icon name={open ? 'close' : 'menu'} />
            </button>

            {open && (
                <div className="absolute inset-x-0 top-16 border-b border-line bg-night/95 px-4 pt-2 pb-5 backdrop-blur-xl">
                    <div className="flex flex-col">
                        {links.map((link) => (
                            <a key={link.label} href={link.href} onClick={() => setOpen(false)} className="border-b border-line py-3 text-dim">
                                {link.label}
                            </a>
                        ))}
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                        <a href={site.repositoryUrl} className="btn btn-ghost">
                            <Icon name="github" className="size-4" /> GitHub
                        </a>
                        <a href={site.quickstartUrl} className="btn btn-primary">
                            Get started
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
