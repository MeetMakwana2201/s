// "use client";
import { cookies } from 'next/headers';

// import CallToAction from '@/components/call-to-action/CallToAction'
// import LatestProducts from '@/components/Products/LatestProducts'
// import ProductDetails from '@/components/Products/ProductDetails'
// import SimilarProducts from '@/components/Products/SimilarProducts'
import React from 'react'
// import { getProductBySlug } from '@/lib/Products/ProductDetails';

// import { useParams } from 'next/navigation';

export default async function Page() {

    const ProductDetailsMap = {
        default: () => import('@/components/theme1/Products/ProductDetails/ProductDetails'),
        theme1: () => import('@/components/theme1/Products/ProductDetails/ProductDetails'),
        theme2: () => import('@/components/theme2/Products/ProductDetails/ProductDetails'),
        theme3: () => import('@/components/theme3/Products/ProductDetails/ProductDetails'),
    };

    const SimilarProductsMap = {
        default: () => import('@/components/theme1/Products/SimilarProducts'),
        theme1: () => import('@/components/theme1/Products/SimilarProducts'),
        theme2: () => import('@/components/theme2/Products/SimilarProducts'),
        theme3: () => import('@/components/theme3/Products/SimilarProducts'),
    };

    const CallToActionMap = {
        default: () => import('@/components/theme1/call-to-action/CallToAction'),
        theme1: () => import('@/components/theme1/call-to-action/CallToAction'),
        theme2: () => import('@/components/theme2/call-to-action/CallToAction'),
        theme3: () => import('@/components/theme3/call-to-action/CallToAction'),
    };

    const LatestProductsMap = {
        default: () => import('@/components/theme1/Products/LatestProducts'),
        theme1: () => import('@/components/theme1/Products/LatestProducts'),
        theme2: () => import('@/components/theme2/Products/LatestProducts'),
        theme3: () => import('@/components/theme3/Products/LatestProducts'),
    };

    type ThemeKey = 'default' | 'theme1' | 'theme2' | 'theme3';
    const theme = ((await cookies()).get('theme')?.value as ThemeKey) || 'default';

    const ProductDetails = (await ProductDetailsMap[theme]())?.default;
    const SimilarProducts = (await SimilarProductsMap[theme]())?.default;
    const CallToAction = (await CallToActionMap[theme]())?.default;
    const LatestProducts = (await LatestProductsMap[theme]())?.default;

    return (
        <div>
            {/* <Breadcrumb category={product.category} productName={product.name} /> */}
            <ProductDetails />
            <SimilarProducts />
            <CallToAction />
            <LatestProducts />
        </div>
    )
}