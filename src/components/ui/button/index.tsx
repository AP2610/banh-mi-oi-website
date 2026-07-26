import type { ComponentPropsWithoutRef, ElementType } from 'react';

import { cn } from '@/lib/utils/cn';

export const buttonVariants = ['primary', 'secondary'] as const;

export type ButtonVariant = (typeof buttonVariants)[number];

type ButtonProps<T extends ElementType = 'button'> = {
    as?: T;
    variant?: ButtonVariant;
    className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className'>;

export const Button = <T extends ElementType = 'button'>({ as, variant = 'primary', className, ...props }: ButtonProps<T>) => {
    const Component = as ?? 'button';

    return (
        <Component
            className={cn(
                'inline-flex min-h-11 items-center justify-center rounded-full border px-6 py-2 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
                {
                    'border-orangeade bg-orangeade text-white hover:bg-orangeade/50': variant === 'primary',
                    'border-white bg-transparent text-white hover:bg-white hover:text-sodalite-blue': variant === 'secondary',
                },
                className,
            )}
            {...props}
        />
    );
};
