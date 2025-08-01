// components/Hero.tsx
import Link from "next/link";
import React from "react";
import heroData from "@/lib/home/homehero";


export default function Hero() {
    return (
        <section
            className="w-full h-screen lg:h-[53vw] xl:h-[50vw] 2xl:h-[45vw] py-10 px-6  md:py-20 relative"
            style={{
                backgroundImage: `url(${heroData.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="container px-4 absolute bottom-10 left-1/2 transform -translate-x-1/2 w-full">
                {/* Text Content */}
                <div className="w-full text-center">
                    <h1 className="text-2xl md:text-3xl font-[outfit] lg:text-6xl font-bold text-black">
                        {heroData.heading}
                    </h1>
                    <p className="my-4 text-sm md:text-lg lg:w-1/2 m-auto lg:text-lg text-black/70">
                        {heroData.subheading}
                    </p>
                    <Link
                        href={heroData.buttonUrl}
                        className="text-center font-[outfit] mt-6 mx-auto bg-primary text-white px-25 py-3 text-sm font-medium "
                    >
                        {heroData.buttonText}
                    </Link>
                </div>
            </div>
        </section>
    );
}
