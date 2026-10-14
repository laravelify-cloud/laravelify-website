import { revalidateTag } from 'next/cache';
import { supportersTag, validWebhookSignature } from '@/lib/buymeacoffee';

/**
 * Buy Me a Coffee webhook (Integrations → Webhooks → Endpoint URL: https://laravelify.cloud/api/buymeacoffee).
 * A signed call expires the cached supporters, so the next visit shows the new one.
 * Nothing from the body is stored.
 */
export async function POST(request: Request): Promise<Response> {
    const body = await request.text();

    if (!validWebhookSignature(body, request.headers.get('x-signature-sha256'))) {
        return Response.json({ ok: false, error: 'Invalid signature.' }, { status: 401 });
    }

    revalidateTag(supportersTag, { expire: 0 });

    return Response.json({ ok: true });
}
