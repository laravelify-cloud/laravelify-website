'use client';

import { useMemo, useState } from 'react';
import { site } from '@/config/site';
import { Icon } from './icon';

const phpVersions = ['8.0', '8.1', '8.2', '8.3', '8.4', '8.5'] as const;
const nodeVersions = ['20', '22', '24'] as const;
const defaultPhp: string[] = [...phpVersions];
const defaultNode: string[] = ['20', '22', '24'];
const hostname = /^[A-Za-z0-9]([A-Za-z0-9.-]*[A-Za-z0-9])?$/;

function sameSet(a: string[], b: string[]): boolean {
    return a.length === b.length && a.every((item) => b.includes(item));
}

/**
 * Build your own install command: pick the PHP-FPM and Node.js versions (and, if you like, the
 * domains), copy one line, and run it on the server. The MySQL root password and the Cloudflare
 * tunnel token are always asked on the server, so they never end up in a copied command.
 */
export function InstallBuilder() {
    const [php, setPhp] = useState<string[]>(defaultPhp);
    const [node, setNode] = useState<string[]>(defaultNode);
    const [panelDomain, setPanelDomain] = useState('');
    const [phpMyAdminDomain, setPhpMyAdminDomain] = useState('');
    const [copied, setCopied] = useState(false);

    const panelPhpMissing = !php.some((version) => ['8.3', '8.4', '8.5'].includes(version));
    const phpForServer = panelPhpMissing ? [...php, '8.4'].sort() : [...php].sort();
    const nodeForServer = [...node].sort((a, b) => Number(a) - Number(b));
    const systemNode = nodeForServer[nodeForServer.length - 1] ?? '24';
    const panelDomainInvalid = panelDomain !== '' && !hostname.test(panelDomain);
    const phpMyAdminDomainInvalid = phpMyAdminDomain !== '' && !hostname.test(phpMyAdminDomain);
    const sameDomains = panelDomain !== '' && panelDomain === phpMyAdminDomain;

    const command = useMemo(() => {
        const options: string[] = [];

        if (!sameSet(phpForServer, defaultPhp)) {
            options.push(`--php=${phpForServer.join(',')}`);
        }

        if (!sameSet(nodeForServer, defaultNode)) {
            options.push(`--node=${nodeForServer.join(',')}`);
        }

        if (panelDomain !== '' && !panelDomainInvalid) {
            options.push(`--panel-domain=${panelDomain}`);
        }

        if (phpMyAdminDomain !== '' && !phpMyAdminDomainInvalid) {
            options.push(`--phpmyadmin-domain=${phpMyAdminDomain}`);
        }

        return options.length === 0 ? site.installCommand : `${site.installCommand} -s -- ${options.join(' ')}`;
    }, [phpForServer, nodeForServer, panelDomain, phpMyAdminDomain, panelDomainInvalid, phpMyAdminDomainInvalid]);

    // At least one version stays ticked in each list.
    function toggle(setList: (update: (list: string[]) => string[]) => void, value: string) {
        setList((list) => {
            if (!list.includes(value)) {
                return [...list, value];
            }

            return list.length > 1 ? list.filter((item) => item !== value) : list;
        });
    }

    async function copy() {
        try {
            await navigator.clipboard.writeText(command);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
        } catch {
            // Clipboard can be blocked (insecure context); the command stays selectable.
        }
    }

    function reset() {
        setPhp(defaultPhp);
        setNode(defaultNode);
        setPanelDomain('');
        setPhpMyAdminDomain('');
    }

    const steps = [
        'Downloaded Laravelify (latest release)',
        'Installing nginx, Redis, Supervisor, Git, and tools',
        ...phpForServer.map((version) => `Installing PHP ${version} (FPM, CLI, MySQL, Redis, GD, intl, and more)`),
        'Installing MySQL 8.4',
        'Installing phpMyAdmin',
        `Installing Node.js ${systemNode}, npm, and PM2`,
        ...nodeForServer.map((version) => `Installing Node.js ${version}`),
        'Setting up MySQL (root password, utf8mb4)',
        'Installing the panel (Composer packages, database)',
        'Creating users and permissions (panel, websites, PM2)',
        'Starting the Cloudflare tunnel',
        'Turning on the firewall (SSH, 80, 443)',
    ];

    return (
        <section id="install" className="border-t border-line py-24">
            <div className="container-page">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="eyebrow">Install</p>
                    <h2 className="section-title mt-3">Build your install command</h2>
                    <p className="mt-4 text-[15px] leading-relaxed text-muted">
                        Choose what goes on your server, copy one line, and run it on a fresh Ubuntu 22.04, 24.04, or 26.04 server as root. You always get the latest release. The MySQL root password and the
                        Cloudflare tunnel token are asked on the server, so they never end up in a copied command.
                    </p>
                </div>

                <div className="mt-12 grid gap-5 lg:grid-cols-[1.05fr_1fr]">
                    <div className="card flex flex-col gap-7 p-6">
                        <fieldset>
                            <legend className="text-sm font-semibold">PHP-FPM versions</legend>
                            <p className="mt-1 text-[13px] text-muted">Each website picks one of these when you add it. Fewer versions install faster.</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {phpVersions.map((version) => (
                                    <Chip key={version} active={php.includes(version)} onClick={() => toggle(setPhp, version)}>
                                        PHP {version}
                                    </Chip>
                                ))}
                            </div>
                            {panelPhpMissing && <p className="mt-2 text-[12.5px] text-warn">The panel itself runs on PHP 8.3 or newer, so PHP 8.4 is added too.</p>}
                        </fieldset>

                        <fieldset>
                            <legend className="text-sm font-semibold">Node.js versions</legend>
                            <p className="mt-1 text-[13px] text-muted">
                                For Node, Next.js, Nuxt, and front-end builds. The newest one you pick is the system Node.js ({systemNode}); a site set to a version you skip uses it.
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {nodeVersions.map((version) => (
                                    <Chip key={version} active={node.includes(version)} onClick={() => toggle(setNode, version)}>
                                        Node {version}
                                    </Chip>
                                ))}
                            </div>
                        </fieldset>

                        <fieldset className="grid gap-4 sm:grid-cols-2">
                            <legend className="mb-3 text-sm font-semibold">Domains (optional, asked on the server otherwise)</legend>
                            <Field label="Panel domain" placeholder="panel.example.com" value={panelDomain} onChange={setPanelDomain} invalid={panelDomainInvalid} />
                            <Field label="phpMyAdmin domain" placeholder="phpmyadmin.example.com" value={phpMyAdminDomain} onChange={setPhpMyAdminDomain} invalid={phpMyAdminDomainInvalid} />
                            {sameDomains && <p className="text-[12.5px] text-bad sm:col-span-2">The panel and phpMyAdmin need different domains.</p>}
                        </fieldset>

                        <p className="text-[13px] text-muted">
                            Always installed: MySQL 8.4, Redis, nginx, phpMyAdmin, Supervisor, PM2, Composer, cloudflared, and a firewall that only opens SSH, 80, and 443.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="card overflow-hidden">
                            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                                <span className="text-[13px] font-medium text-dim">Your command</span>
                                <button type="button" onClick={reset} className="text-[12.5px] text-muted transition hover:text-ink">
                                    Reset
                                </button>
                            </div>
                            <div className="flex items-start gap-3 p-4 font-mono text-[13px]">
                                <span className="select-none text-faint">$</span>
                                <code className="min-w-0 flex-1 break-words text-dim">{command}</code>
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
                        </div>

                        <div className="card flex-1 overflow-hidden bg-[#0c0e12]">
                            <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
                                <span className="size-2.5 rounded-full bg-white/15" />
                                <span className="size-2.5 rounded-full bg-white/15" />
                                <span className="size-2.5 rounded-full bg-white/15" />
                                <span className="ml-2 text-[12px] text-faint">What you will see on the server</span>
                            </div>
                            <div className="max-h-[22rem] overflow-y-auto p-4 font-mono text-[12.5px] leading-[1.75]">
                                <p className="text-faint">
                                    ┌ <span className="font-semibold text-brand-light">Laravelify</span> installer · self-hosted deployment panel
                                </p>
                                <p className="text-faint">│</p>
                                <p className="text-[#7dcfff]">
                                    ◇ <span className="text-dim">Settings</span>
                                </p>
                                <p className="text-faint">
                                    │ <span className="text-muted">PHP-FPM  {phpForServer.join(' ')}</span>
                                </p>
                                <p className="text-faint">
                                    │ <span className="text-muted">Node.js  {nodeForServer.join(' ')} (system: {systemNode})</span>
                                </p>
                                <p className="text-faint">│</p>
                                {steps.map((step) => (
                                    <p key={step} className="text-dim">
                                        <span className="text-ok">◆</span> {step}
                                    </p>
                                ))}
                                <p className="text-faint">│</p>
                                <p className="text-faint">
                                    └ <span className="font-semibold text-ok">Laravelify is installed</span> (about 10 minutes)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-[13px] transition ${
                active ? 'border-brand-light/60 bg-brand/20 text-ink' : 'border-line text-muted hover:border-line-strong hover:text-dim'
            }`}
        >
            <span className={`grid size-3.5 place-items-center rounded-[4px] border ${active ? 'border-brand-light bg-brand-light text-white' : 'border-line-strong'}`}>
                {active && <Icon name="check" className="size-2.5" />}
            </span>
            {children}
        </button>
    );
}

function Field({ label, placeholder, value, onChange, invalid }: { label: string; placeholder: string; value: string; onChange: (value: string) => void; invalid: boolean }) {
    return (
        <label className="flex flex-col gap-1.5">
            <span className="text-[13px] text-muted">{label}</span>
            <input
                type="text"
                inputMode="url"
                spellCheck={false}
                autoComplete="off"
                value={value}
                placeholder={placeholder}
                onChange={(event) => onChange(event.target.value.trim().toLowerCase())}
                className={`h-10 rounded-lg border bg-raised px-3 font-mono text-[13px] text-ink outline-none placeholder:text-faint focus:border-brand-light ${invalid ? 'border-bad' : 'border-line'}`}
            />
            {invalid && <span className="text-[12px] text-bad">Not a hostname, like panel.example.com</span>}
        </label>
    );
}
