import type { Metadata, Viewport } from 'next';
import { Instrument_Sans } from 'next/font/google';
import { site } from '@/config/site';
import './globals.css';

const instrument = Instrument_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-instrument',
    display: 'swap',
});

export const metadata: Metadata = {
    metadataBase: new URL(site.url),
    title: {
        default: `${site.name}: ${site.tagline}`,
        template: `%s · ${site.name}`,
    },
    description: site.description,
    keywords: ['Laravel', 'Next.js', 'Vue', 'React', 'Angular', 'Nuxt', 'NestJS', 'Express', 'self-hosted', 'deployment', 'PaaS', 'Coolify alternative', 'server panel', 'open source'],
    alternates: { canonical: '/' },
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: '48x48' },
            { url: '/favicon.svg', type: 'image/svg+xml' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: '/apple-touch-icon.png',
        other: [{ rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#6B16ED' }],
    },
    manifest: '/site.webmanifest',
    openGraph: {
        type: 'website',
        url: site.url,
        siteName: site.name,
        title: `${site.name}: ${site.tagline}`,
        description: site.description,
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: site.tagline }],
    },
    twitter: {
        card: 'summary_large_image',
        title: `${site.name}: ${site.tagline}`,
        description: site.description,
        images: ['/og-image.png'],
    },
};

export const viewport: Viewport = {
    themeColor: '#09090B',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={instrument.variable}>
            <body>{children}</body>
        </html>
    );
}
