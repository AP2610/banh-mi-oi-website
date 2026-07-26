'use client';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';
import { motion, type MotionProps } from 'motion/react';

type PaddingSizes = 'small' | 'medium' | 'large';

type SectionProps = Omit<ComponentPropsWithoutRef<'section'>, keyof MotionProps> & {
    children: ReactNode;
    isFullWidth?: boolean;
    paddingTop?: PaddingSizes;
    paddingBottom?: PaddingSizes;
    animateOnScroll?: boolean;
};

export const Section = ({
    children,
    className,
    id,
    paddingTop,
    paddingBottom,
    isFullWidth = false,
    animateOnScroll = false,
    ...rest
}: SectionProps) => {
    const sectionClasses = cn(
        'transition-[padding] duration-500 ease-in-out',
        {
            container: !isFullWidth,
            'w-full': isFullWidth,
            'pt-8 sm:pt-10 lg:pt-12': paddingTop === 'small',
            'pt-12 sm:pt-16 lg:pt-20': paddingTop === 'medium',
            'pt-16 sm:pt-20 lg:pt-24': paddingTop === 'large',
            'pb-8 sm:pb-10 lg:pb-12': paddingBottom === 'small',
            'pb-12 sm:pb-16 lg:pb-20': paddingBottom === 'medium',
            'pb-16 sm:pb-20 lg:pb-24': paddingBottom === 'large',
        },
        className,
    );

    const motionProps: MotionProps = {
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.4, delay: 0.3 },
        viewport: { once: true, margin: '-75px' },
    };

    const sectionProps = {
        ...rest,
        id,
        className: sectionClasses,
    };

    return (
        <>
            {animateOnScroll ? (
                <motion.section {...sectionProps} {...motionProps}>
                    {children}
                </motion.section>
            ) : (
                <section {...sectionProps}>{children}</section>
            )}
        </>
    );
};
