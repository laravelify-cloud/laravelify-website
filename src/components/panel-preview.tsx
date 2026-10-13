import { Icon, type IconName } from './icon';

/**
 * An illustration of the panel's Monitoring tab (sample data on example.com),
 * drawn in HTML so it stays sharp at every size. Swap for a real screenshot any time.
 */
const bars = Array.from({ length: 48 }, (_, index) => {
    const wave = 0.55 + 0.4 * Math.sin((index - 8) / 7.6);
    const jitter = ((index * 37) % 11) / 30;
    return {
        height: Math.round(Math.max(0.12, Math.min(1, wave + jitter - 0.15)) * 100),
        warn: index % 9 === 4,
        bad: index === 31,
    };
});

const sidebar: { label: string; icon: IconName; active?: boolean }[] = [
    { label: 'Dashboard', icon: 'layers' },
    { label: 'Monitoring', icon: 'chart', active: true },
    { label: 'Server monitoring', icon: 'cpu' },
    { label: 'File manager', icon: 'server' },
    { label: 'Terminal', icon: 'terminal' },
    { label: 'Sources', icon: 'git' },
    { label: 'Telegram bot', icon: 'bell' },
];

const feed = [
    ['14:05:09', 'GET', '/api/messages', 200, '82ms'],
    ['14:05:08', 'POST', '/broadcasting/auth', 200, '41ms'],
    ['14:05:08', 'GET', '/dashboard', 200, '163ms'],
    ['14:05:07', 'GET', '/.env', 404, '3ms'],
] as const;

export function PanelPreview() {
    return (
        <div className="relative mx-auto max-w-6xl">
            <div className="absolute -inset-x-10 -top-10 -bottom-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgb(107_22_237/0.28),transparent_65%)] blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-line-strong bg-[#0c0c0e] shadow-[0_40px_120px_-40px_rgb(0_0_0/0.9)]" role="img" aria-label="The Laravelify panel showing website monitoring">
                {/* Window chrome */}
                <div className="flex h-10 items-center gap-2 border-b border-line px-4">
                    <span className="size-3 rounded-full bg-[#ff5f57]" />
                    <span className="size-3 rounded-full bg-[#febc2e]" />
                    <span className="size-3 rounded-full bg-[#28c840]" />
                    <span className="mx-auto rounded-md border border-line bg-white/[0.03] px-3 py-0.5 font-mono text-[11px] text-faint">panel.example.com/websites/app?tab=monitoring</span>
                </div>

                <div className="flex text-left">
                    {/* Sidebar */}
                    <aside className="hidden w-52 shrink-0 border-r border-line p-3 lg:block">
                        <div className="mb-4 flex items-center gap-2 px-2 pt-1">
                            <img src="/brand/mark.svg" alt="" className="size-6" />
                            <span className="text-sm font-semibold">Laravelify</span>
                        </div>
                        {sidebar.map((item) => (
                            <div
                                key={item.label}
                                className={`mb-px flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] ${item.active ? 'bg-white/[0.06] text-ink' : 'text-faint'}`}
                            >
                                <Icon name={item.icon} className={`size-4 ${item.active ? 'text-accent' : ''}`} />
                                {item.label}
                            </div>
                        ))}
                    </aside>

                    {/* Main */}
                    <div className="min-w-0 flex-1 p-4 sm:p-5">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <p className="text-[11px] text-faint">Groups / production</p>
                                <p className="text-base font-semibold">app.example.com</p>
                            </div>
                            <div className="flex gap-1 rounded-lg border border-line bg-white/[0.02] p-0.5 font-mono text-[10.5px] font-semibold text-faint">
                                {['1H', '24H', '7D', '30D'].map((range) => (
                                    <span key={range} className={`rounded-md px-2 py-1 ${range === '24H' ? 'bg-white/[0.08] text-ink' : ''}`}>
                                        {range}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                            {[
                                ['Requests', '12.4k', ''],
                                ['P95', '182ms', ''],
                                ['Error rate', '0.12%', ''],
                                ['Uptime', '99.98%', 'text-ok'],
                            ].map(([label, value, tone]) => (
                                <div key={label} className="rounded-xl border border-line bg-white/[0.02] p-3">
                                    <p className="text-[10px] font-semibold tracking-[0.08em] text-faint uppercase">{label}</p>
                                    <p className={`mt-1 text-xl font-semibold tabular-nums ${tone}`}>{value}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-2.5 grid gap-2.5 md:grid-cols-[1.4fr_1fr]">
                            <div className="rounded-xl border border-line bg-white/[0.02] p-3">
                                <div className="flex items-center justify-between">
                                    <p className="text-[10px] font-semibold tracking-[0.08em] text-faint uppercase">Requests · 24h</p>
                                    <div className="flex gap-3 text-[10px] text-faint">
                                        <span className="flex items-center gap-1"><i className="size-1.5 rounded-full bg-zinc-500" />2xx</span>
                                        <span className="flex items-center gap-1"><i className="size-1.5 rounded-full bg-warn" />4xx</span>
                                        <span className="flex items-center gap-1"><i className="size-1.5 rounded-full bg-bad" />5xx</span>
                                    </div>
                                </div>
                                <div className="mt-3 flex h-28 items-end gap-[3px]">
                                    {bars.map((bar, index) => (
                                        <div key={index} className="flex flex-1 flex-col justify-end overflow-hidden rounded-t-[2px]" style={{ height: `${bar.height}%` }}>
                                            {bar.bad && <div className="h-[18%] bg-bad" />}
                                            {bar.warn && <div className="h-[16%] bg-warn" />}
                                            <div className="flex-1 bg-zinc-600/80" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-xl border border-line bg-white/[0.02] p-3">
                                <div className="flex items-center gap-2">
                                    <span className="relative flex size-2">
                                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-60" />
                                        <span className="relative inline-flex size-2 rounded-full bg-ok" />
                                    </span>
                                    <p className="text-[10px] font-semibold tracking-[0.08em] text-faint uppercase">Live requests</p>
                                </div>
                                <div className="mt-2.5 flex flex-col gap-1">
                                    {feed.map(([time, method, path, status, ms]) => (
                                        <div key={time + path} className="flex items-center gap-2 rounded-md bg-white/[0.02] px-2 py-1.5 font-mono text-[10.5px]">
                                            <span className="text-faint">{time}</span>
                                            <span className="rounded bg-white/[0.06] px-1 text-dim">{method}</span>
                                            <span className="min-w-0 flex-1 truncate text-dim">{path}</span>
                                            {status === 404 ? (
                                                <span className="rounded bg-bad/15 px-1 text-bad">scanner</span>
                                            ) : null}
                                            <span className={status === 200 ? 'text-ok' : 'text-warn'}>{status}</span>
                                            <span className="w-9 text-right text-faint">{ms}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
