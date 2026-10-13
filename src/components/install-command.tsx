'use client';

import { useState } from 'react';
import { site } from '@/config/site';
import { Icon } from './icon';

/**
 * The one-line installer with a copy button (Coolify style).
 */
export function InstallCommand({ className = '' }: { className?: string }) {
    const [copied, setCopied] = useState(false);

    async function copy() {
        try {
            await navigator.clipboard.writeText(site.installCommand);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
        } catch {
            // Clipboard can be blocked (insecure context); the command stays selectable.
        }
    }

    return (
        <div className={`group flex items-center gap-3 rounded-xl border border-line bg-raised/80 py-3 pr-2 pl-4 text-left font-mono text-[13px] shadow-[inset_0_1px_0_rgb(255_255_255/0.04)] backdrop-blur sm:text-sm ${className}`}>
            <span className="select-none text-faint">$</span>
            <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap text-dim [scrollbar-width:none]">{site.installCommand}</code>
            <button
                type="button"
                onClick={copy}
                className="grid size-8 shrink-0 place-items-center rounded-lg text-muted transition hover:bg-white/5 hover:text-ink"
                aria-label={copied ? 'Copied' : 'Copy install command'}
                title={copied ? 'Copied' : 'Copy'}
            >
                <Icon name={copied ? 'check' : 'copy'} className={`size-4 ${copied ? 'text-ok' : ''}`} />
            </button>
        </div>
    );
}
