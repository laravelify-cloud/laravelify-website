/**
 * Everything the landing page links to, in one place.
 * The GitHub organization is laravelify-cloud; repositories: laravelify, laravelify-website, laravelify-docs.
 */
const repository = 'laravelify-cloud/laravelify';

export const site = {
    name: 'Laravelify',
    url: 'https://laravelify.cloud',
    tagline: 'Self-hosted deploys for any app: Laravel, Node.js, React, Vue, Next.js & more',
    description:
        'Laravelify is an open-source, self-hosted control panel that deploys Laravel, PHP, Node.js, React, Vue, Angular, Next.js, Nuxt, and more to your own Ubuntu server, with live monitoring, attack detection, and Telegram alerts.',

    // Shown in the beta banner and the hero badge. Keep in step with the panel's VERSION file.
    version: '0.3.0-beta.71',
    beta: true,

    repository,
    repositoryUrl: `https://github.com/${repository}`,
    releasesUrl: `https://github.com/${repository}/releases`,
    issuesUrl: `https://github.com/${repository}/issues`,
    discussionsUrl: `https://github.com/${repository}/discussions`,
    securityUrl: `https://github.com/${repository}/security/policy`,

    docsUrl: 'https://docs.laravelify.cloud',
    quickstartUrl: 'https://docs.laravelify.cloud/quickstart',
    installScriptUrl: 'https://cdn.laravelify.cloud/install.sh',
    installCommand: 'curl -fsSL https://cdn.laravelify.cloud/install.sh | sudo bash',

    // GitHub Sponsors needs the account enabled at github.com/sponsors.
    sponsorUrl: 'https://github.com/sponsors/laravelify-cloud',
    sponsorEmail: 'sponsors@laravelify.cloud',

    // Buy Me a Coffee: the page, the floating widget, and the supporters list (saved from its webhook, see README).
    coffeeId: 'arshadarsh01',
    coffeeUrl: 'https://buymeacoffee.com/arshadarsh01',
} as const;
