/**
 * Sponsors shown on the landing page, like Coolify's.
 *
 * Add a sponsor:
 *   1. Put the logo in public/sponsors/ (SVG preferred; PNG at least 400px wide, transparent background).
 *      For logos that are dark on light, add a `logoDark` version for the dark page.
 *   2. Add an entry to the right tier below, then deploy.
 *
 * Empty tiers show "Your logo here" slots that link to the sponsor page, so the
 * section works before the first sponsor arrives. Only list real sponsors.
 */
export type Sponsor = {
    name: string;
    url: string;
    logo: string;
    logoDark?: string;
    description?: string;
};

export type SponsorTier = {
    id: 'special' | 'gold' | 'silver';
    title: string;
    blurb: string;
    monthly: string;
    slots: number;
    sponsors: Sponsor[];
};

export const sponsorTiers: SponsorTier[] = [
    {
        id: 'special',
        title: 'Special sponsors',
        blurb: 'Large logo on the home page, in the README, and in the docs.',
        monthly: '$500 / month',
        slots: 2,
        sponsors: [],
    },
    {
        id: 'gold',
        title: 'Gold sponsors',
        blurb: 'Logo on the home page and in the README.',
        monthly: '$100 / month',
        slots: 4,
        sponsors: [],
    },
    {
        id: 'silver',
        title: 'Silver sponsors',
        blurb: 'Small logo on the home page.',
        monthly: '$25 / month',
        slots: 6,
        sponsors: [],
    },
];

/**
 * Individual backers (GitHub Sponsors usernames). Their avatars come from GitHub.
 */
export const backers: string[] = [];
