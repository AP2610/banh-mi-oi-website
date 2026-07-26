import Image from 'next/image';
import Link from 'next/link';

export const SiteFooter = () => (
    <footer className="bg-sodalite-blue text-white">
        <div className="container mx-auto flex items-center justify-between gap-6 px-5 py-8 sm:px-8 lg:px-10">
            <Link href="/">
                <Image src="/logos/logo.svg" width={820} height={448} unoptimized alt="" className="h-12 w-auto shrink-0 sm:h-14" />
            </Link>

            <p className="text-right text-sm font-medium sm:text-base">© 2026 Bánh Mì Oi! Paris</p>
        </div>
    </footer>
);
