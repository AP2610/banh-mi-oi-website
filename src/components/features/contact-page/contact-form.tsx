'use client';

import { type FormEvent, useState } from 'react';

import { Button } from '@/components/ui/button';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils/cn';

type ContactFormProps = {
    locale: Locale;
    submitLabel: string;
};

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';
type FieldName = 'name' | 'email' | 'message';
type FieldErrors = Partial<Record<FieldName, string>>;

const fieldNames: FieldName[] = ['name', 'email', 'message'];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const formCopy = {
    fr: {
        name: 'Nom',
        email: 'E-mail',
        message: 'Message',
        nameRequired: 'Veuillez saisir votre nom.',
        emailRequired: 'Veuillez saisir votre adresse e-mail.',
        emailInvalid: 'Veuillez saisir une adresse e-mail valide.',
        messageRequired: 'Veuillez saisir un message.',
        messageTooShort: 'Votre message doit contenir au moins 10 caractères.',
        success: 'Votre message a bien été envoyé.',
        error: 'Votre message n’a pas pu être envoyé. Veuillez réessayer.',
    },
    en: {
        name: 'Name',
        email: 'Email',
        message: 'Message',
        nameRequired: 'Please enter your name.',
        emailRequired: 'Please enter your email address.',
        emailInvalid: 'Please enter a valid email address.',
        messageRequired: 'Please enter a message.',
        messageTooShort: 'Your message must contain at least 10 characters.',
        success: 'Your message has been sent.',
        error: 'Your message could not be sent. Please try again.',
    },
} satisfies Record<Locale, Record<string, string>>;

const fieldClasses =
    'min-h-12 w-full rounded-sm border border-sodalite-blue/30 bg-white px-4 py-3 text-foreground outline-none transition-colors focus:border-orangeade focus:ring-2 focus:ring-orangeade/30';
const errorFieldClasses = 'border-error focus:border-error focus:ring-error/30';

const isFieldName = (value: string): value is FieldName => fieldNames.includes(value as FieldName);

export const ContactForm = ({ locale, submitLabel }: ContactFormProps) => {
    const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const copy = formCopy[locale];

    const focusFirstInvalidField = (errors: FieldErrors) => {
        const firstInvalidField = fieldNames.find((fieldName) => errors[fieldName]);

        if (firstInvalidField) {
            requestAnimationFrame(() => document.getElementById(`contact-${firstInvalidField}`)?.focus());
        }
    };

    const validate = (formData: FormData): FieldErrors => {
        const errors: FieldErrors = {};
        const name = String(formData.get('name') ?? '').trim();
        const email = String(formData.get('email') ?? '').trim();
        const message = String(formData.get('message') ?? '').trim();

        if (!name) errors.name = copy.nameRequired;
        if (!email) errors.email = copy.emailRequired;
        else if (!EMAIL_PATTERN.test(email)) errors.email = copy.emailInvalid;
        if (!message) errors.message = copy.messageRequired;
        else if (message.length < 10) errors.message = copy.messageTooShort;

        return errors;
    };

    const handleInput = (event: FormEvent<HTMLFormElement>) => {
        const field = event.target as HTMLInputElement | HTMLTextAreaElement;

        if (!isFieldName(field.name) || !fieldErrors[field.name]) return;

        setFieldErrors((currentErrors) => ({ ...currentErrors, [field.name]: undefined }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);
        const validationErrors = validate(formData);

        if (Object.keys(validationErrors).length > 0) {
            setFieldErrors(validationErrors);
            setSubmissionState('idle');
            focusFirstInvalidField(validationErrors);
            return;
        }

        setFieldErrors({});
        setSubmissionState('submitting');

        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        }).catch(() => null);

        if (response?.ok) {
            form.reset();
            setFieldErrors({});
            setSubmissionState('success');
            return;
        }

        const responseBody = await response?.json().catch(() => null);
        const invalidFields: FieldName[] = Array.isArray(responseBody?.invalidFields)
            ? (responseBody.invalidFields as unknown[]).filter(
                  (fieldName: unknown): fieldName is FieldName => typeof fieldName === 'string' && isFieldName(fieldName),
              )
            : [];

        if (invalidFields.length > 0) {
            const serverErrors = invalidFields.reduce<FieldErrors>((errors, fieldName) => {
                errors[fieldName] = fieldName === 'email' ? copy.emailInvalid : fieldName === 'message' ? copy.messageTooShort : copy.nameRequired;
                return errors;
            }, {});

            setFieldErrors(serverErrors);
            setSubmissionState('idle');
            focusFirstInvalidField(serverErrors);
            return;
        }

        setSubmissionState('error');
    };

    return (
        <form onSubmit={handleSubmit} onInput={handleInput} noValidate className="space-y-6">
            <div>
                <label htmlFor="contact-name" className="mb-2 block font-semibold">
                    {copy.name}
                </label>
                <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    maxLength={100}
                    autoComplete="name"
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
                    className={cn(fieldClasses, fieldErrors.name && errorFieldClasses)}
                />
                {fieldErrors.name ? (
                    <p id="contact-name-error" role="alert" className="mt-2 text-sm font-semibold text-error">
                        {fieldErrors.name}
                    </p>
                ) : null}
            </div>

            <div>
                <label htmlFor="contact-email" className="mb-2 block font-semibold">
                    {copy.email}
                </label>
                <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    maxLength={254}
                    autoComplete="email"
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
                    className={cn(fieldClasses, fieldErrors.email && errorFieldClasses)}
                />
                {fieldErrors.email ? (
                    <p id="contact-email-error" role="alert" className="mt-2 text-sm font-semibold text-error">
                        {fieldErrors.email}
                    </p>
                ) : null}
            </div>

            <div>
                <label htmlFor="contact-message" className="mb-2 block font-semibold">
                    {copy.message}
                </label>
                <textarea
                    id="contact-message"
                    name="message"
                    required
                    minLength={10}
                    maxLength={5000}
                    rows={8}
                    aria-invalid={Boolean(fieldErrors.message)}
                    aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
                    className={cn(fieldClasses, fieldErrors.message && errorFieldClasses)}
                />
                {fieldErrors.message ? (
                    <p id="contact-message-error" role="alert" className="mt-2 text-sm font-semibold text-error">
                        {fieldErrors.message}
                    </p>
                ) : null}
            </div>

            <div className="absolute left-[-9999px]" aria-hidden="true">
                <label htmlFor="contact-company">Company</label>
                <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <Button type="submit" disabled={submissionState === 'submitting'} className="cursor-pointer disabled:cursor-wait disabled:opacity-60">
                {submitLabel}
            </Button>

            <p aria-live="polite" className="min-h-6 text-sm font-semibold">
                {submissionState === 'success' ? copy.success : null}
                {submissionState === 'error' ? copy.error : null}
            </p>
        </form>
    );
};
