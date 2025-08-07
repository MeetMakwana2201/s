"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getSupportSlug } from '@/lib/Support/support';
import Cookies from 'js-cookie'

type Product = {
  slug: string;
  title: string;
  content: string;
};

type BreadcrumbProps = {
  productName?: string;
};

export default function Support() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const [product, setProduct] = useState<Product | null>(null);
  const [BreadcrumbComponent, setBreadcrumbComponent] = useState<React.ComponentType<BreadcrumbProps> | null>(null);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      const prod = await getSupportSlug(slug);
      setProduct(prod);
    };

    fetchData();
  }, [slug]);

  useEffect(() => {
    setLoading(true)
    const theme = Cookies.get('theme') || 'default';
    const loadBreadcrumb = async () => {
      try {
        const mod = await import(`@/components/${theme}/Breadcrumb/Breadcrumb`);
        setBreadcrumbComponent(() => mod.default);
      } catch (err) {
        console.error("Failed to load breadcrumb for theme:", theme, err);
      } finally {
        setLoading(false)
      }
    };

    loadBreadcrumb();
  }, []);

  return (
    <div>
      {BreadcrumbComponent && <BreadcrumbComponent productName={product?.title} />}

      {loading ? (
        <div className='px-4 xl:px-12 min-h-[500px]'>Loading...</div>
      ) :
        product && (
          <div className='px-4 xl:px-12 '>
            <div className='border p-6 rounded-2xl border-black'>
              <h1 className='text-2xl lg:text-4xl font-[outfit] font-bold mb-6'>{product.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: product.content }} />
            </div>

          </div>
        )}
    </div>
  );
}
