'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils'; // if using class merge utils

interface TileProps {
    title: string;
    description: string;
    image: string;
    buttonText: string;
    textColor: string;
    buttonColor: string;
    link: string;
}

export default function CatalogTile({
    title,
    description,
    image,
    buttonText,
    textColor,
    buttonColor,
    link,
}: TileProps) {
    return (
        <div className="relative h-[450px] md:h-[400px] lg:h-[450px] xl:h-[500px] 2xl:h-[650px] w-full overflow-hidden">
            <Image src={image} alt={title} fill={true} className="object-cover" />
            <div className="absolute bottom-0 p-6 flex flex-col justify-center text-center md:text-start">
                <h3 className={`text-xl md:text-4xl font-[outfit] font-bold text-${textColor}`}>{title}</h3>
                <p className={`text-sm lg:text-xl lg:w-xl mt-2 text-${textColor}`}>{description}</p>
                <Link href={link} className="mt-4 mb-4 w-fit">
                    <button
                        className={cn(
                            "border hover:cursor-pointer border-black text-black hover:bg-black hover:text-white transition-all duration-300 px-25 py-2 text-sm font-medium",
                            buttonColor === "white" ? "bg-transparent text-black" : "bg-primary text-white"
                        )}
                    >
                        {buttonText}
                    </button>
                </Link>
            </div>
        </div>
    );
}
