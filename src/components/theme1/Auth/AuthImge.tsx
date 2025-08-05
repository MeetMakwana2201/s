import React from 'react'
import Image from 'next/image';

export default function AuthImge() {
    return (
        <>
            {/* Left Side - Image */}
            <div className="w-full h-full p-3 md:p-6 flex justify-center items-center">
                <div className="rounded-2xl overflow-hidden w-[60%] md:w-full">
                    <Image
                        src="/images/auth-flow-image.png" // Replace with your image path or URL
                        alt="Login visual"
                        width={600}
                        height={600}
                        className="object-cover w-full h-auto aspect-square"
                        priority
                    />
                </div>
            </div>
        </>
    )
}
