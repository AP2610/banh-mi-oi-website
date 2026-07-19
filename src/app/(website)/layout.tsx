import type { Metadata } from 'next';

import { AppShell } from '@/components/layout/app-shell';

// TODO: Localise metadata from Sanity when the SEO slice is implemented.
export const metadata: Metadata = {
    title: 'Bánh Mì Oi! | Street food vietnamienne à Paris',
    description: 'Des Bánh Mì frais préparés avec passion à Paris.',
};

type WebsiteLayoutProps = {
    children: React.ReactNode;
};

const WebsiteLayout = ({ children }: WebsiteLayoutProps) => (
    <div className="website-root bg-background font-body text-foreground antialiased">
        <AppShell>{children}</AppShell>
    </div>
);

export default WebsiteLayout;
