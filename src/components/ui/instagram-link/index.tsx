import { FaInstagram } from 'react-icons/fa6';

import { cn } from '@/lib/utils/cn';

type InstagramLinkProps = {
    href: string;
    label: string;
    className?: string;
};

export const InstagramLink = ({ href, label, className }: InstagramLinkProps) => (
    <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
        className={cn('inline-flex size-11 items-center justify-center rounded-full transition-colors', className)}
    >
        <FaInstagram aria-hidden="true" className="size-6" />
    </a>
);
