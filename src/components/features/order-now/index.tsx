import Image from 'next/image';

import { Section } from '@/components/layout/section';
import { Heading } from '@/components/ui/heading';
import { buildSanityImageUrl, getSanityImageObjectPosition, type SanityContentImage } from '@/sanity/lib/image';

export type HomePageOrder = {
    title: string;
    subtitle: string | null;
    uberEatsUrl: string;
    deliverooUrl: string;
    image: SanityContentImage;
};

type OrderNowProps = {
    order: HomePageOrder;
};

const deliveryApps = [
    {
        name: 'Uber Eats',
        icon: '/take-away-apps/icons/uber-eats.svg',
        width: 48,
        height: 48,
        urlField: 'uberEatsUrl',
    },
    {
        name: 'Deliveroo',
        icon: '/take-away-apps/icons/deliveroo.svg',
        width: 1561,
        height: 416,
        urlField: 'deliverooUrl',
    },
] as const;

export const OrderNow = ({ order }: OrderNowProps) => (
    <div id="order" className="overflow-hidden bg-secondary text-white">
        <Section isFullWidth animateOnScroll paddingTop="large" paddingBottom="large" aria-labelledby="order-heading">
            <div className="container mx-auto grid items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-10">
                <div className="flex h-full flex-col justify-center bg-background p-8">
                    <Heading level="h2" id="order-heading" className="text-sodalite-blue">
                        {order.title}
                    </Heading>

                    {order.subtitle ? <p className="mt-5 max-w-prose text-lg leading-relaxed text-sodalite-blue">{order.subtitle}</p> : null}

                    <div className="mt-8 flex flex-wrap items-center gap-8">
                        {deliveryApps.map((app) => (
                            <a
                                key={app.name}
                                href={order[app.urlField]}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`Commander sur ${app.name} (nouvel onglet)`}
                                className="group flex h-20 min-w-20 items-center justify-center transition duration-300 hover:-translate-y-1 hover:scale-105"
                            >
                                <Image
                                    src={app.icon}
                                    width={app.width}
                                    height={app.height}
                                    unoptimized
                                    alt=""
                                    className={app.name === 'Deliveroo' ? 'h-auto w-48' : 'size-28'}
                                />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="relative aspect-4/3 min-h-0 overflow-hidden">
                    <Image
                        src={buildSanityImageUrl(order.image)}
                        alt={order.image.alt}
                        fill
                        sizes="(max-width: 1023px) 100vw, 50vw"
                        placeholder={order.image.lqip ? 'blur' : 'empty'}
                        blurDataURL={order.image.lqip ?? undefined}
                        className="object-cover"
                        style={{ objectPosition: getSanityImageObjectPosition(order.image) }}
                    />
                </div>
            </div>
        </Section>
    </div>
);
