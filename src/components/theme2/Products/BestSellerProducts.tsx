'use client';

import Image from "next/image";
import { bestSellers } from "@/lib/Products/bestSellers";
import Link from "next/link";

export default function ProductCard() {
  return (
    <section className="px-4 xl:px-12 lg:py-8 pt-4 lg:mt-12">
      <h2 className=" text-2xl lg:text-4xl font-[outfit] font-bold mb-6">BEST SELLER PRODUCTS</h2>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {bestSellers.map(product => (
          <Link href={`/products/${product.slug}`} className="space-y-2" key={product.id}>
            <div className="w-full aspect-square relative rounded-xl overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-sm text-gray-400">{product.brand}</p>
            <h3 className="text-sm font-medium">{product.title}</h3>
            <div className="text-sm font-semibold text-black flex gap-2">
              <span>${product.price.toFixed(2)}</span>
              <span className="line-through text-muted-foreground">${product.oldPrice.toFixed(2)}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Link href="/best-seller-products" className="lg:mb-15 border hover:cursor-pointer border-black text-black hover:bg-black hover:text-white transition-all duration-300 lg:px-25 lg:py-2 p-4 text-sm font-medium">
          VIEW MORE PRODUCTS
        </Link>
      </div>
    </section>

  );
}