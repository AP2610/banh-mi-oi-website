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

interface RootLayoutProps {
    children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
    return (
        <html lang="fr">
            <head>
                <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <meta name="apple-mobile-web-app-title" content="Banh Mi Oi" />
                <link rel="manifest" href="/site.webmanifest" />
            </head>
            <body className={`${bebasNeue.variable} ${quicksand.variable}`}>{children}</body>
        </html>
    );
};

export default RootLayout;
