import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import { sanityFetch } from '@/sanity/lib/fetch';
import { CONTACT_RECIPIENT_QUERY } from '@/sanity/queries/site-settings';

const MAX_REQUEST_SIZE = 8_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getString = (value: unknown): string => (typeof value === 'string' ? value.trim() : '');

const sanitizePlainText = (value: string): string =>
    value
        .normalize('NFKC')
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u202A-\u202E\u2066-\u2069]/g, '')
        .replaceAll('<', '‹')
        .replaceAll('>', '›');

export const POST = async (request: Request) => {
    const contentLength = Number(request.headers.get('content-length') ?? 0);

    if (contentLength > MAX_REQUEST_SIZE) {
        return NextResponse.json({ error: 'Invalid submission.' }, { status: 413 });
    }

    const body = await request.json().catch(() => null);

    if (!body || typeof body !== 'object') {
        return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 });
    }

    const values = body as Record<string, unknown>;
    const name = getString(values.name);
    const email = getString(values.email);
    const message = getString(values.message);
    const company = getString(values.company);

    if (company) {
        return NextResponse.json({ success: true });
    }

    const invalidFields = [
        ...(!name || name.length > 100 ? ['name'] : []),
        ...(!EMAIL_PATTERN.test(email) || email.length > 254 ? ['email'] : []),
        ...(message.length < 10 || message.length > 5000 ? ['message'] : []),
    ];

    if (invalidFields.length > 0) {
        return NextResponse.json({ error: 'Invalid submission.', invalidFields }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    if (!apiKey || !fromEmail) {
        console.error('Contact delivery is missing RESEND_API_KEY or RESEND_FROM_EMAIL.');
        return NextResponse.json({ error: 'Message delivery is unavailable.' }, { status: 500 });
    }

    const recipient = await sanityFetch<string | null>({ query: CONTACT_RECIPIENT_QUERY });

    if (!recipient) {
        console.error('Contact delivery is missing the recipient configured in Site Settings.');
        return NextResponse.json({ error: 'Message delivery is unavailable.' }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const safeName = sanitizePlainText(name).replace(/[\r\n]+/g, ' ');
    const safeMessage = sanitizePlainText(message);
    const { error } = await resend.emails.send({
        from: fromEmail,
        to: recipient,
        replyTo: email,
        subject: `Nouveau message du site — ${safeName}`,
        text: [`Nom: ${safeName}`, `E-mail: ${email}`, '', safeMessage].join('\n'),
    });

    if (error) {
        console.error('Resend rejected a contact submission.', { name: error.name });
        return NextResponse.json({ error: 'Message delivery failed.' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
};
