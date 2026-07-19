import type { Metadata } from 'next';

import { SiteHeader } from '@/components/layout/site-header';

// TODO: Localise metadata from Sanity when the SEO slice is implemented.
export const metadata: Metadata = {
    title: 'Bánh Mì Oi! | Street food vietnamienne à Paris',
    description: 'Des Bánh Mì frais préparés avec passion à Paris.',
};

type WebsiteLayoutProps = {
    children: React.ReactNode;
};

const WebsiteLayout = ({ children }: WebsiteLayoutProps) => (
    <div className="website-root flex min-h-svh flex-col bg-background font-body text-foreground antialiased">
        <SiteHeader />

        <main className="flex-1">{children}</main>
    </div>
);

export default WebsiteLayout;
