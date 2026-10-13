/**
 * Line icons on a 24px grid, the same style as the panel's menu icons.
 */
const paths = {
    rocket: 'M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 15l-3-3c1-4 4.5-8.5 13-9-.5 8.5-5 12-9 13zM14.5 9.5h.01',
    layers: 'M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 17l9 5 9-5',
    chart: 'M5 20v-9M12 20V5M19 20v-6M3 20h18',
    bug: 'M9 7a3 3 0 0 1 6 0v1H9zM7 9h10v5a5 5 0 0 1-10 0zM12 11v8M4 12h3M17 12h3M5 18l2.5-1.5M19 18l-2.5-1.5M5 7l2.5 1.5M19 7l-2.5 1.5',
    shield: 'M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6zM9 12l2 2 4-4',
    pulse: 'M3 12h4l3-8 4 16 3-8h4',
    cpu: 'M7 7h10v10H7zM10 10h4v4h-4zM9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4',
    bell: 'M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0',
    backup: 'M7 18a5 5 0 0 1-.5-9.97A6 6 0 0 1 18 9.5a4.25 4.25 0 0 1-.5 8.5zM12 16v-5M9.5 13.5L12 11l2.5 2.5',
    cloud: 'M7 18a5 5 0 0 1-.5-9.97A6 6 0 0 1 18 9.5a4.25 4.25 0 0 1-.5 8.5z',
    lock: 'M6 11h12v9H6zM8 11V8a4 4 0 0 1 8 0v3',
    terminal: 'M4 6h16v12H4zM8 10l2 2-2 2M12 14h4',
    git: 'M7 7a3 3 0 1 0 0.1 0M17 17a3 3 0 1 0 0.1 0M9.5 8.5l5 7',
    copy: 'M9 9h10v10H9zM5 15V5h10',
    check: 'M5 12.5l4.5 4.5L19 7.5',
    star: 'M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z',
    arrow: 'M5 12h14M13 6l6 6-6 6',
    external: 'M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5',
    heart: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z',
    server: 'M5 6h14v4H5zM5 14h14v4H5zM8 8h.01M8 16h.01',
    wallet: 'M4 7h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4zM4 7V6a2 2 0 0 1 2-2h10M16 13h.01',
    key: 'M15 8a4 4 0 1 0-3.4 4H9l-2 2v2H5v2h3v-2l1-1h2.6A4 4 0 0 0 15 8z',
    plug: 'M9 3v5M15 3v5M7 8h10v3a5 5 0 0 1-10 0zM12 16v5',
    menu: 'M4 7h16M4 12h16M4 17h16',
    close: 'M6 6l12 12M18 6L6 18',
    github: '',
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, className = 'size-5' }: { name: IconName; className?: string }) {
    if (name === 'github') {
        return (
            <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
            </svg>
        );
    }

    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d={paths[name]} />
        </svg>
    );
}
