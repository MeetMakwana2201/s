"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getSupportSlug } from '@/lib/Support/support';

type Product = {
  slug: string;
  title: string;
  content: string;
};

export default function Support() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!slug) return; // 💥 Prevent fetch if slug is undefined

    const fetchData = async () => {
      const prod = await getSupportSlug(slug);
      setProduct(prod);
    };

    fetchData();
  }, [slug]);

  console.log(product);

  return (
    <div>
      <h1>Support: {slug}</h1>

      {product ? (
        <div dangerouslySetInnerHTML={{ __html: product.content }} />
      ) : (
        <p>Loading or not found...</p>
      )}
    </div>
  );
}
