'use client';

import { offerBannerData } from '@/lib/Offer/offerposter';

export default function OfferBanner() {
    const { backgroundUrl } = offerBannerData;

    return (
        <section
            className="w-full h-[300px] md:h-[400px] lg:h-[450px] xl:h-[500px] 2xl:h-[600px] 2xl:bg-cover flex items-end justify-center bg-center bg-no-repeat bg-contain relative"
            style={{ backgroundImage: `url(${backgroundUrl})` }}
        >
        </section>
    );
}
