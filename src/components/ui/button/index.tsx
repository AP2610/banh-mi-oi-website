import type { ComponentPropsWithoutRef, ElementType } from 'react';

import { cn } from '@/lib/utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'inverse';

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
                'inline-flex min-h-11 items-center justify-center rounded-sm border px-6 py-2 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
                {
                    'border-orangeade bg-orangeade text-white hover:border-primary-dark hover:bg-primary-dark': variant === 'primary',
                    'border-sodalite-blue bg-transparent text-sodalite-blue hover:bg-sodalite-blue hover:text-white': variant === 'secondary',
                    'border-white bg-transparent text-white hover:bg-white hover:text-sodalite-blue': variant === 'inverse',
                },
                className,
            )}
            {...props}
        />
    );
};
