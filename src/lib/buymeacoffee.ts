import { createHmac, timingSafeEqual } from 'node:crypto';

/** Cache tag of the supporters list. The Buy Me a Coffee webhook expires it. */
export const supportersTag = 'bmc-supporters';

export type CoffeeSupporter = {
    id: string;
    name: string;
    coffees: number;
    note: string | null;
    createdAt: string | null;
};

type ApiSupporter = Record<string, unknown>;

const apiUrl = 'https://developers.buymeacoffee.com/api/v1/supporters';

/** Pages read from the API, 5 supporters each by default, so the newest are shown. */
const maxPages = 6;

function text(value: unknown): string | null {
    return typeof value === 'string' && value.trim() !== '' ? value.trim() : null;
}

/**
 * One supporter from the API. Private supports show as "Someone" without their note,
 * and refunded supports are left out.
 */
function toSupporter(row: ApiSupporter): CoffeeSupporter | null {
    if (row.is_refunded === true || row.is_refunded === 1 || row.is_refunded === '1') {
        return null;
    }

    const isPrivate = row.support_visibility === 0 || row.support_visibility === '0';
    const coffees = Number(row.support_coffees ?? row.number_of_coffees ?? 1);

    return {
        id: String(row.support_id ?? row.id ?? `${row.supporter_name}-${row.support_created_on}`),
        name: isPrivate ? 'Someone' : (text(row.supporter_name) ?? text(row.payer_name) ?? 'Someone'),
        coffees: Number.isFinite(coffees) && coffees > 0 ? coffees : 1,
        note: isPrivate ? null : text(row.support_note),
        createdAt: text(row.support_created_on),
    };
}

/**
 * Supporters from Buy Me a Coffee, newest first. Cached for an hour, and refreshed at once
 * when the webhook reports a new one. Empty when BMC_ACCESS_TOKEN is not set or the API fails.
 */
export async function coffeeSupporters(): Promise<CoffeeSupporter[]> {
    const token = process.env.BMC_ACCESS_TOKEN;

    if (!token) {
        return [];
    }

    const supporters: CoffeeSupporter[] = [];

    try {
        for (let page = 1; page <= maxPages; page++) {
            const response = await fetch(`${apiUrl}?page=${page}`, {
                headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
                next: { revalidate: 3600, tags: [supportersTag] },
            });

            if (!response.ok) {
                break;
            }

            const body = (await response.json()) as { data?: ApiSupporter[]; next_page_url?: string | null };
            const rows = Array.isArray(body.data) ? body.data : [];

            for (const row of rows) {
                const supporter = toSupporter(row);

                if (supporter) {
                    supporters.push(supporter);
                }
            }

            if (!body.next_page_url || rows.length === 0) {
                break;
            }
        }
    } catch {
        // Show what was read; the page never fails because of the API.
    }

    return supporters;
}

/**
 * Whether a webhook body was signed with BMC_WEBHOOK_SECRET (x-signature-sha256: hex HMAC-SHA256 of the raw body).
 */
export function validWebhookSignature(rawBody: string, signature: string | null): boolean {
    const secret = process.env.BMC_WEBHOOK_SECRET;

    if (!secret || !signature) {
        return false;
    }

    const expected = Buffer.from(createHmac('sha256', secret).update(rawBody).digest('hex'));
    const given = Buffer.from(signature.trim().toLowerCase());

    return expected.length === given.length && timingSafeEqual(expected, given);
}
