import Image from 'next/image';
import Link from 'next/link';

// TODO: Implement correct site header and connect to sanity Navigation schema
export const SiteHeader = () => (
    <header className="absolute inset-x-0 top-0 z-20 bg-linear-to-b from-black/60 to-transparent text-white">
        <div className="container mx-auto flex items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
            <Link href="/" className="inline-flex items-center" aria-label="Bánh Mì Oi !, accueil">
                <Image src="/logos/logo-small.svg" width={820} height={448} alt="" className="h-14 w-auto sm:h-16" />
            </Link>

            {/* TODO add translations for aria labels as well */}
            <nav aria-label="Navigation principale">
                <a
                    href="#hero"
                    aria-current="page"
                    className="inline-flex min-h-11 items-center rounded-full border border-white/70 px-5 font-medium transition-colors hover:bg-white hover:text-sodalite-blue"
                >
                    Accueil
                </a>
            </nav>
        </div>
    </header>
);
