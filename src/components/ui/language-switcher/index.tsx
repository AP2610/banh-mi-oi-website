'use client';

import { type ChangeEvent, useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';

import { usePathname, useRouter } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

import styles from './language-switcher.module.css';

const SWITCH_DURATION = 300;

type LocaleSwitchProps = {
    locale: Locale;
    pathname: string;
};

const LocaleSwitch = ({ locale, pathname }: LocaleSwitchProps) => {
    const router = useRouter();
    const navigationTimer = useRef<number | null>(null);
    const [isEnglish, setIsEnglish] = useState(locale === 'en');

    useEffect(
        () => () => {
            if (navigationTimer.current !== null) {
                window.clearTimeout(navigationTimer.current);
            }
        },
        [],
    );

    const handleChange = ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
        const nextIsEnglish = currentTarget.checked;
        const nextLocale = nextIsEnglish ? 'en' : 'fr';

        setIsEnglish(nextIsEnglish);

        if (navigationTimer.current !== null) {
            window.clearTimeout(navigationTimer.current);
        }

        const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : SWITCH_DURATION;

        navigationTimer.current = window.setTimeout(() => {
            router.replace(pathname, { locale: nextLocale, scroll: false });
        }, delay);
    };

    return (
        <label className={styles.switch}>
            {/* TODO: Translate this label based on the active locale. */}
            <input
                type="checkbox"
                role="switch"
                checked={isEnglish}
                onChange={handleChange}
                aria-label={isEnglish ? 'Afficher le site en français' : 'Afficher le site en anglais'}
                className={styles.input}
            />

            <span aria-hidden="true" className={styles.thumb} />

            <span className={`${styles.label} ${styles.labelFrench}`}>FR</span>
            <span className={`${styles.label} ${styles.labelEnglish}`}>EN</span>
        </label>
    );
};

export const LanguageSwitcher = () => {
    const locale = useLocale() as Locale;
    const pathname = usePathname();

    return <LocaleSwitch key={locale} locale={locale} pathname={pathname} />;
};
