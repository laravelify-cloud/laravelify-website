import { createHmac, timingSafeEqual } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';

/**
 * Buy Me a Coffee has no API to read supporters, only webhooks. Every signed webhook updates
 * a small JSON file on the server, and the page reads that file.
 * Only what the page shows is saved: no email addresses and no amounts.
 */

export type SupporterKind = 'coffee' | 'member' | 'monthly';

export type CoffeeSupporter = {
    key: string;
    kind: SupporterKind;
    name: string;
    coffees: number;
    note: string | null;
    level: string | null;
    createdAt: number | null;
    test: boolean;
};

type SupportersFile = { supporters: CoffeeSupporter[] };

type WebhookEvent = {
    type?: string;
    live_mode?: boolean;
    data?: Record<string, unknown>;
};

/**
 * Where the supporters are kept. Set BMC_DATA_FILE to a path outside the build folder so deploys
 * keep it (deploy/ecosystem.config.cjs and deploy/deploy.sh do this).
 */
export function supportersFile(): string {
    return process.env.BMC_DATA_FILE || path.join(/*turbopackIgnore: true*/ process.cwd(), 'storage', 'bmc-supporters.json');
}

/** Test events from the dashboard ("Send test event") are saved, but only shown with BMC_SHOW_TEST_EVENTS=true. */
function showTestEvents(): boolean {
    return process.env.BMC_SHOW_TEST_EVENTS === 'true';
}

async function load(): Promise<SupportersFile> {
    try {
        const parsed = JSON.parse(await readFile(/*turbopackIgnore: true*/ supportersFile(), 'utf8')) as Partial<SupportersFile>;

        return { supporters: Array.isArray(parsed.supporters) ? parsed.supporters : [] };
    } catch {
        return { supporters: [] };
    }
}

async function save(file: SupportersFile): Promise<void> {
    const target = supportersFile();
    const temporary = `${target}.${process.pid}.tmp`;

    await mkdir(/*turbopackIgnore: true*/ path.dirname(target), { recursive: true });
    await writeFile(/*turbopackIgnore: true*/ temporary, JSON.stringify(file, null, 2));
    await rename(/*turbopackIgnore: true*/ temporary, target);
}

/** Supporters to show, newest first. Empty until the first webhook arrives. */
export async function coffeeSupporters(): Promise<CoffeeSupporter[]> {
    const { supporters } = await load();

    return supporters
        .filter((supporter) => showTestEvents() || !supporter.test)
        .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
}

function text(value: unknown): string | null {
    return typeof value === 'string' && value.trim() !== '' ? value.trim() : null;
}

function isTrue(value: unknown): boolean {
    return value === true || value === 'true' || value === 1 || value === '1';
}

/** The name to show. Supporters who stay anonymous on Buy Me a Coffee show as "Someone". */
function displayName(data: Record<string, unknown>): string {
    const nameType = String(data.supporter_name_type ?? '').toLowerCase();

    if (nameType.includes('anon') || nameType.includes('hidden') || nameType.includes('private')) {
        return 'Someone';
    }

    return text(data.supporter_name) ?? 'Someone';
}

function noteOf(data: Record<string, unknown>): string | null {
    return isTrue(data.note_hidden) ? null : text(data.support_note);
}

/** One-time payments: a coffee, an extra, a commission, or a wishlist item. */
const paymentEvents: Record<string, 'add' | 'remove'> = {
    'donation.created': 'add',
    'donation.refunded': 'remove',
    'extra_purchase.created': 'add',
    'extra_purchase.updated': 'add',
    'extra_purchase.refunded': 'remove',
    'commission_order.created': 'add',
    'commission_order.refunded': 'remove',
    'wishlist_payment.created': 'add',
    'wishlist_payment.refunded': 'remove',
};

/**
 * Apply one webhook event to the saved supporters.
 *
 * @returns What happened, for the webhook response.
 */
export async function applyWebhookEvent(event: WebhookEvent): Promise<string> {
    const type = String(event.type ?? '');
    const data = event.data ?? {};
    const test = event.live_mode === false;
    const file = await load();
    const createdAt = Number(data.created_at ?? data.started_at ?? 0) || Math.floor(Date.now() / 1000);

    const upsert = (supporter: CoffeeSupporter) => {
        file.supporters = [supporter, ...file.supporters.filter((existing) => existing.key !== supporter.key)];
    };
    const remove = (key: string) => {
        file.supporters = file.supporters.filter((existing) => existing.key !== key);
    };

    if (type in paymentEvents) {
        const key = `payment:${type.split('.')[0]}:${data.id ?? data.transaction_id ?? createdAt}`;
        const refunded = paymentEvents[type] === 'remove' || isTrue(data.refunded) || data.status === 'refunded';

        if (refunded) {
            remove(key);
        } else {
            const coffees = Number(data.coffee_count ?? 1);
            upsert({
                key,
                kind: 'coffee',
                name: displayName(data),
                coffees: Number.isFinite(coffees) && coffees > 0 ? coffees : 1,
                note: noteOf(data),
                level: null,
                createdAt,
                test,
            });
        }
    } else if (type.startsWith('membership.') || type.startsWith('recurring_donation.')) {
        const kind: SupporterKind = type.startsWith('membership.') ? 'member' : 'monthly';
        const key = `${kind}:${data.id ?? data.psp_id ?? data.supporter_id}`;
        const ended = type.endsWith('.cancelled') || type.endsWith('.paused') || isTrue(data.canceled) || isTrue(data.paused) || (data.status !== undefined && data.status !== 'active');

        if (ended) {
            remove(key);
        } else {
            upsert({
                key,
                kind,
                name: displayName(data),
                coffees: 0,
                note: noteOf(data),
                level: kind === 'member' ? text(data.membership_level_name) : null,
                createdAt,
                test,
            });
        }
    } else {
        return `ignored ${type || 'unknown event'}`;
    }

    await save(file);

    return `${type} saved${test ? ' (test event)' : ''}`;
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
