'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import categories from '@/lib/categories/CategoriesSlider';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';

export default function CategorySlider() {
  return (
    <section className="py-10 px-4 lg:px-10 bg-white">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold font-outfit uppercase">Categories</h2>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: '.swiper-next',
          prevEl: '.swiper-prev',
        }}
        spaceBetween={30}
        slidesPerView={3}
        loop={false}
        className="w-full"
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <Link
              href={`/category/${category.name}`}
              className="rounded-xl overflow-hidden block text-center transition-all duration-300"
            >
              <Image
                src={category.image}
                width={300}
                height={300}
                alt={category.name}
                className="w-full aspect-square object-cover rounded-xl"
              />
              <p className="font-semibold mt-3 text-lg uppercase">{category.name}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom Navigation Buttons */}
      <div className="flex justify-center gap-2 mt-6">
        <button
          className="swiper-prev text-black border border-black bg-white p-2 rounded hover:bg-opacity-80 transition"
          aria-label="Previous"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          className="swiper-next text-black border border-black bg-white p-2 rounded hover:bg-opacity-80 transition"
          aria-label="Next"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
