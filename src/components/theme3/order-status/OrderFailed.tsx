"use client";

import React from 'react'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function OrderFailed() {

  const router = useRouter();

  return (
    <div>
      <DotLottieReact
        src="/lottie/Order-Placed-Sucessfully.json"
        loop
        autoplay
        className='size-64 lg:size-96  mx-auto'
      />
      <h2 className="text-2xl lg:text-4xl font-black font-[outfit] mt-6 uppercase">
        COULDN’T COMPLETE YOUR ORDER !!
      </h2>
      <p className="text-sm lg:text-base mt-2 text-muted-foreground">
        Your Order Couldn&apos;t be processed at the moment, please try again.
      </p>
      <Button
        className="mt-6 cursor-pointer rounded-none py-6 px-10 w-full lg:w-auto"
        // variant="secondary"
        onClick={() => router.push("/cart")}
      >
        RETURN TO CART
      </Button>
    </div>
  )
}
