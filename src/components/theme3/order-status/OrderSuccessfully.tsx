"use client";

import React from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function OrderSuccessfully() {

    const router = useRouter();

    return (
        <>
            <Image
                src="/order-success.png" // Replace with actual image path
                alt="Order Success"
                width={120}
                height={120}
            />
            <h2 className="text-2xl font-black font-[outfit] mt-6 uppercase">
                ORDER PLACED SUCCESSFULLY !!
            </h2>
            <p className="text-sm mt-2 text-muted-foreground">
                Your order has been placed and is now being processed. Continue shopping..
            </p>
            <Button
                className="mt-6"
                onClick={() => router.push("/shop")} // Or your actual shopping page
            >
                CONTINUE SHOPPING
            </Button>
        </>
    )
}
