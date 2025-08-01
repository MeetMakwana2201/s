'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import categories from '@/lib/categories/CategoriesSlider';
import Link from 'next/link';

export default function CategorySlider() {
  // Group categories into pairs for double row
  const groupedCategories = Array.from({ length: Math.ceil(categories.length / 2) }, (_, i) =>
    categories.slice(i * 2, i * 2 + 2)
  );

  return (
    <section className="py-5 px-5 lg:py-10 lg:px-9 lg:mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold font-outfit">Categories</h2>
        <div className="flex gap-2">
          <button
            className="swiper-prev text-black border border-black bg-white lg:p-2 p-1 rounded hover:bg-opacity-80 transition"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="swiper-next text-black border border-black bg-white lg:p-2 p-1 rounded hover:bg-opacity-80 transition"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: '.swiper-next',
          prevEl: '.swiper-prev',
        }}
        breakpoints={{
          320: {
            slidesPerView: 2.5,
          },
          640: {
            slidesPerView: 2.5,
          },
          768: {
            slidesPerView: 3.5,
          },
          1024: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 5,
          },
          1536: {
            slidesPerView: 6,
          },
        }}
        className="w-full"
      >
        {/* 🔀 Conditional Rendering based on isDoubleSlider */}
        {categories.length > 10
          ? groupedCategories.map((group, i) => (
            <SwiperSlide key={i}>
              <div className="flex flex-col gap-6">
                {group.map((category) => (
                  <Link href={`/category/${category.name}`} key={category.id} className="rounded-xl overflow-hidden"                  >
                    <Image
                      src={category.image}
                      width={248}
                      height={248}
                      alt={category.name}
                      className="w-full aspect-square object-cover"
                    />
                    <p className="font-medium mt-2">{category.name}</p>
                  </Link>
                ))}
              </div>
            </SwiperSlide>
          ))
          : categories.map((category) => (
            <SwiperSlide key={category.id}>
              <Link href={`/category/${category.name}`} className="rounded-xl overflow-hidden transition-all duration-300">
                <Image
                  src={category.image}
                  width={248}
                  height={248}
                  alt={category.name}
                  className="w-full aspect-square object-cover"
                />
                <p className="font-medium mt-2">{category.name}</p>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
}
