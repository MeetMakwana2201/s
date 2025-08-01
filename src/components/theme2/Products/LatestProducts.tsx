'use client';

import Image from "next/image";
import { LatestProducts } from "@/lib/Products/LatestProducts";
import Link from "next/link";

export default function ProductCard() {
    return (
        <section className="px-4 xl:px-12 lg:py-8 pt-4 lg:mt-12">
            <h2 className="text-2xl lg:text-4xl font-[outfit] font-bold mb-6">LATEST PRODUCTS</h2>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                {LatestProducts.map(product => (
                    <Link href={`/products/${product.title}`} className="space-y-2" key={product.id}>
                        <div className="w-full aspect-square relative rounded-xl overflow-hidden">
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <p className="text-sm text-gray-400">{product.brand}</p>
                        <p className="text-sm font-medium">{product.title}</p>
                        <div className="text-sm font-semibold text-black flex gap-2">
                            <span>${product.price.toFixed(2)}</span>
                            <span className="line-through text-muted-foreground">${product.oldPrice.toFixed(2)}</span>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="mt-8 mb-8 lg:mb-0 flex justify-center">
                <Link href="/latest-products" className="lg:mb-15 border hover:cursor-pointer border-black text-black hover:bg-black hover:text-white transition-all duration-300 lg:px-25 lg:py-2 p-4 text-sm font-medium">
                    VIEW MORE PRODUCTS
                </Link>
            </div>
        </section>

    );
}