"use client";

import React, { useState } from 'react'
import Image from 'next/image';
type CategoriesDetailsInnerProps = {
  title: string;
  description: string;
  imageUrl: string;
  availableCount: number;
};


export default function CategoriesDetailsInner(props: CategoriesDetailsInnerProps) {

  const { title, description, imageUrl, availableCount } = props;

  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <div className="lg:px-12.5 px-3">
      <div className="flex items-start flex-col md:flex-row gap-4 p-4 lg:p-6 border border-[#515151] rounded-[20px]">
        {/* Left Image */}
        <div className="shrink-0 rounded-lg overflow-hidden md:w-[200px] md:h-[200px] w-full h-full">
          <Image
            src={imageUrl}
            alt={title}
            width={200}
            height={200}
            priority
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Right Content */}
        <div className="flex-1">
          {/* Product Count Badge */}
          <div className='flex items-center justify-between flex-col md:flex-row mb-4 '>
            {/* Title */}
            <h3 className="text-xl font-bold md:mb-8 mb-2.5 mt-2.5">{title}</h3>

            <div className=" text-gray-700 border border-[#515151] p-3.5 text-base rounded-[15px]">
              Available Products : <strong>{availableCount}</strong>
            </div>

          </div>

          {/* Description */}
          <p className="text-base text-gray-700">
            {expanded ? description : `${description.slice(0, 500)}`}{' '}
            {description.length > 500 && (
              <button
                onClick={toggleExpanded}
                className="text-black underline font-semibold ml-1"
              >
                {expanded ? 'View Less' : 'View More'}
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
