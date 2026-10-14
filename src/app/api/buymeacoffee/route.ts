import { revalidatePath } from 'next/cache';
import { applyWebhookEvent, validWebhookSignature } from '@/lib/buymeacoffee';

/** Webhook calls are handled one at a time, so two events never write the file together. */
let queue: Promise<unknown> = Promise.resolve();

/**
 * Buy Me a Coffee webhook (Webhooks → Endpoint URL: https://laravelify.cloud/api/buymeacoffee).
 * A signed event updates the saved supporters, and the home page is rebuilt on the next visit.
 */
export async function POST(request: Request): Promise<Response> {
    const body = await request.text();

    if (!validWebhookSignature(body, request.headers.get('x-signature-sha256'))) {
        return Response.json({ ok: false, error: 'Invalid signature.' }, { status: 401 });
    }

    let event: unknown;

    try {
        event = JSON.parse(body);
    } catch {
        return Response.json({ ok: false, error: 'The body is not JSON.' }, { status: 400 });
    }

    const run = queue.then(() => applyWebhookEvent(event as Parameters<typeof applyWebhookEvent>[0]));
    queue = run.catch(() => undefined);
    const result = await run;

    revalidatePath('/');

    return Response.json({ ok: true, result });
}
