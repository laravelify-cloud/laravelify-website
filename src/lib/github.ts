import { site } from '@/config/site';

/**
 * Star count for the navbar. Cached for an hour; null when GitHub is unreachable
 * or the repository is not public yet, and the badge then shows no number.
 */
export async function githubStars(): Promise<number | null> {
    // Still the placeholder from the README (written so the find-and-replace leaves this line alone).
    if (site.repository.startsWith('YOUR-')) {
        return null;
    }

    try {
        const response = await fetch(`https://api.github.com/repos/${site.repository}`, {
            headers: { Accept: 'application/vnd.github+json' },
            next: { revalidate: 3600 },
        });

        if (!response.ok) {
            return null;
        }

        const data = (await response.json()) as { stargazers_count?: number };

        return typeof data.stargazers_count === 'number' ? data.stargazers_count : null;
    } catch {
        return null;
    }
}

export function formatStars(count: number): string {
    return count >= 1000 ? `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}k` : String(count);
}
