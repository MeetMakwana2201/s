"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function OrderSuccessfully() {

    const router = useRouter();

    return (
        <>
            <DotLottieReact
                src="/lottie/Order-Placed-Sucessfully.json"
                loop
                autoplay
                className='size-96 mx-auto'
            />
            <h2 className="text-4xl font-black font-[outfit] mt-6 uppercase">
                ORDER PLACED SUCCESSFULLY !!
            </h2>
            <p className="text-base mt-2 text-muted-foreground">
                Your order has been placed and is now being processed. Continue shopping..
            </p>
            <Button
                className="mt-6 cursor-pointer rounded-none py-6 px-10"
                onClick={() => router.push("/")}
            >
                CONTINUE SHOPPING
            </Button>
        </>
    )
}
