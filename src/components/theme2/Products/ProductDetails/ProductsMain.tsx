import React from 'react'
import ProductDetails from '@/components/Products/ProductDetails'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { getProductBySlug } from '@/lib/Products/ProductDetails';
import { useParams } from 'next/navigation';

export default async function ProductsMain() {
    const params = useParams<{ slug: string; }>();
    const slug = params.slug;
    const prod = await getProductBySlug(slug);

    return (
        <>
            <Breadcrumb category={prod.category} productName={prod.name} />
            <ProductDetails />
        </>
    )
}
