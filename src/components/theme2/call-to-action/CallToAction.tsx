'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { callToAction } from '@/lib/call-to-action/CallToAction';

export default function CallToAction() {
  return (
    <section className="bg-cover bg-center lg:p-12 p-5 h-[450px] md:h-[400px] lg:h-[450px] xl:h-[550px] 2xl:h-[650px] "
      style={{
        backgroundImage: `url(${callToAction.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="h-full mx-auto flex flex-col md:flex-row items-end justify-end gap-8">
        <div className="md:flex-1">
          <h2 className={`text-xl md:text-4xl font-[outfit] font-bold text-${callToAction.textColor}`}>{callToAction.title}</h2>
          <p className={`text-sm text-${callToAction.textColor} md:text-xl max-w-lg`}>{callToAction.description}</p>
          <Link href={callToAction.link}>
            <button
              className={cn(
                "mt-5 border hover:cursor-pointer border-black text-black hover:bg-black hover:text-white transition-all duration-300 px-14 lg:px-25 py-2 text-sm font-medium"
              )}
            >
              {callToAction.buttonText}
            </button>
          </Link>
        </div>
        <div className="flex-1 hidden md:block"></div>
      </div>
    </section>
  );
}
