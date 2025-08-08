"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getSupportSlug } from '@/lib/Support/support';
import Cookies from 'js-cookie'
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      setLoading(true)
      const prod = await getSupportSlug(slug);

      // 👇 Redirect to 404 if not found
      if (!prod) {
        router.push('/404');
        return;
      }

      setProduct(prod);
      setLoading(false)
    };

    console.log('Fetching data for slug:', slug);
    fetchData();
  }, [router, slug]);

  useEffect(() => {
    const theme = Cookies.get('theme') || 'default';
    const loadBreadcrumb = async () => {
      try {
        const mod = await import(`@/components/${theme}/Breadcrumb/Breadcrumb`);
        setBreadcrumbComponent(() => mod.default);
      } catch (err) {
        console.error("Failed to load breadcrumb for theme:", theme, err);
      }
    };

    loadBreadcrumb();
  }, []);

  return (
    <div>

      {loading ? (
        <div className='px-4 xl:px-12 min-h-[500px] flex justify-center items-center'>Loading...</div>
      ) :
        product && (
          <>
            {BreadcrumbComponent && <BreadcrumbComponent productName={product?.title} />}
            <div className='px-4 xl:px-12 '>
              <div className='border p-6 rounded-2xl border-black'>
                <h1 className='text-2xl lg:text-4xl font-[outfit] font-bold mb-6'>{product.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: product.content }} />
              </div>

            </div>
          </>
        )}
    </div>
  );
}
