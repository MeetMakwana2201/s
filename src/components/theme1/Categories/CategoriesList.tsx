'use client';

import Image from "next/image";
import { Categories } from "@/lib/categories/CategoriesList";
import Link from "next/link";

export default function ProductCard() {
  return (
    <section className="px-4 xl:px-12 lg:py-8 pt-4 ">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {Categories.map(product => (
          <Link href={`/category/${product.slug}`} className="space-y-2" key={product.id}>
            <div className="w-full aspect-square relative rounded-xl overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-sm font-medium">{product.name}</p>
          </Link>
        ))}
      </div>
    </section>

  );
}