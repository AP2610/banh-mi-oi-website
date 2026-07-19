import type { Metadata } from 'next';
import { Bebas_Neue, Quicksand } from 'next/font/google';
import '../styles/globals.css';

const bebasNeue = Bebas_Neue({
    variable: '--font-bebas',
    subsets: ['latin'],
    fallback: ['system-ui', 'arial'],
    display: 'swap',
    weight: '400',
});

const quicksand = Quicksand({
    variable: '--font-quicksand',
    subsets: ['latin'],
    fallback: ['system-ui', 'arial'],
    display: 'swap',
});

// TODO: Figure out how to localise metadata - Use a generateMetaData function to pull SEO from sanity
export const metadata: Metadata = {
    title: 'Banh Mi Oi!',
    description: 'This is a starter app for Next.js to get started faster for projects.',
};

interface RootLayoutProps {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}

const RootLayout = async ({ children, params }: RootLayoutProps) => {
    const { locale } = await params;

    return (
        <html lang={locale}>
            <body className={`${bebasNeue.variable} ${quicksand.variable} bg-background text-foreground antialiased`}>
                <div className="flex min-h-screen flex-col">
                    <main className="flex-1">{children}</main>
                </div>
            </body>
        </html>
    );
};

export default RootLayout;
