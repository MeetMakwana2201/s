'use client';

import { Button } from '@/components/ui/button';
import { offerBannerData } from '@/lib/Offer/offerposter';
import Link from 'next/link';

export default function OfferBanner() {
  return (
    <section
      className="w-full h-[300px] md:h-[400px] lg:h-[450px] xl:h-[500px] 2xl:h-[600px] flex items-center justify-center bg-no-repeat bg-center bg-cover relative"
      style={{
        backgroundImage: `url(${offerBannerData.backgroundUrl})`,
      }}
    >
      {/* Overlay Content */}
      <div className="relative z-10 text-right w-full max-w-6xl px-4 md:px-10">
        <div className="ml-auto max-w-md lg:min-h-[400px] flex justify-end items-end">
          <Link href="/sale">
            <Button className="px-20 py-2 uppercase font-semibold hover:bg-opacity-90 transition-all rounded-none">
              {offerBannerData.buttonText || 'Start Shopping'}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}