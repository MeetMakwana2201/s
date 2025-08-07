"use client";

import React from 'react'
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function OrderFailed() {

  const router = useRouter();

  return (
    <div>
      <Image
        src="/order-fail.png" // Replace with actual image path
        alt="Order Failed"
        width={120}
        height={120}
      />
      <h2 className="text-2xl font-black font-[outfit] mt-6 uppercase">
        COULDN’T COMPLETE YOUR ORDER !!
      </h2>
      <p className="text-sm mt-2 text-muted-foreground">
        Your Order Couldn&apos;t be processed at the moment, please try again.
      </p>
      <Button
        className="mt-6"
        variant="secondary"
        onClick={() => router.push("/cart")}
      >
        RETURN TO CART
      </Button>
    </div>
  )
}
