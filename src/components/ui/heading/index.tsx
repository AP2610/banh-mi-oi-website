import type { ComponentPropsWithRef, ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

export const headingLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;

export type HeadingLevel = (typeof headingLevels)[number];

const BASE_CLASSES = 'm-0 text-secondary transition-[font-size] duration-500';

const HEADING_STYLES_MAP: Record<HeadingLevel, string> = {
    h1: 'font-heading text-5xl leading-[0.95] font-black uppercase sm:text-6xl lg:text-7xl',
    h2: 'font-heading text-4xl leading-none font-black uppercase sm:text-5xl lg:text-6xl',
    h3: 'font-heading text-3xl leading-none font-black uppercase sm:text-4xl',
    h4: 'font-heading text-2xl leading-tight font-black uppercase sm:text-3xl',
    h5: 'font-heading text-xl leading-tight font-bold uppercase sm:text-2xl',
    h6: 'font-heading text-lg leading-tight font-bold uppercase sm:text-xl',
};

export interface HeadingProps extends Omit<ComponentPropsWithRef<'h1'>, 'children'> {
    level: HeadingLevel;
    as?: HeadingLevel;
    children: ReactNode;
}

export const Heading = ({ level, as, children, className, ref, ...rest }: HeadingProps) => {
    const HeadingTag = level;
    const visualLevel = as ?? level;

    return (
        <HeadingTag ref={ref} className={cn(BASE_CLASSES, HEADING_STYLES_MAP[visualLevel], className)} {...rest}>
            {children}
        </HeadingTag>
    );
};
