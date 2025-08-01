'use client';

import { offerBannerData } from '@/lib/Offer/offerposter';
import Link from 'next/link';

export default function OfferBanner() {
  return (
    <section
      className="w-full h-[300px] md:h-[400px] lg:h-[450px] xl:h-[500px] 2xl:h-[600px] 2xl:bg-cover flex items-end justify-center bg-center bg-no-repeat bg-contain relative"
      style={{
        backgroundImage: `url(${offerBannerData.backgroundUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 text-center px-4">
        <Link href="/sale">
          <button className="mb-5 lg:mb-15 border hover:cursor-pointer border-black text-black hover:bg-black hover:text-white transition-all duration-300 px-25 py-2 text-sm font-medium">
            {offerBannerData.buttonText}
          </button>
        </Link>
      </div>
    </section>
  );
}