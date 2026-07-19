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
            <body className={`${bebasNeue.variable} ${quicksand.variable}`}>{children}</body>
        </html>
    );
};

export default RootLayout;
