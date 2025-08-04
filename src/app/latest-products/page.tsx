// import CallToAction from '@/components/call-to-action/CallToAction'
// import BestSellerProducts from '@/components/Products/BestSellerProducts'
// import ProductList from '@/components/Products/ProductList'
import React from 'react'
import { cookies } from 'next/headers';

export default async function page() {
    type ThemeKey = 'theme1' | 'theme2' | 'theme3';
    const theme = ((await cookies()).get('theme')?.value as ThemeKey) || 'default';

    const ProductListMap = {
        theme1: () => import('@/components/theme1/Products/ProductList'),
        theme2: () => import('@/components/theme2/Products/ProductList'),
        theme3: () => import('@/components/theme3/Products/ProductList'),
    };

    const CallToActionMap = {
        theme1: () => import('@/components/theme1/call-to-action/CallToAction'),
        theme2: () => import('@/components/theme2/call-to-action/CallToAction'),
        theme3: () => import('@/components/theme3/call-to-action/CallToAction'),
    };

    const BestSellerProductsMap = {
        theme1: () => import('@/components/theme1/Products/BestSellerProducts'),
        theme2: () => import('@/components/theme2/Products/BestSellerProducts'),
        theme3: () => import('@/components/theme3/Products/BestSellerProducts'),
    };


    const ProductList = (await ProductListMap[theme]())?.default;
    const CallToAction = (await CallToActionMap[theme]())?.default;
    const BestSellerProducts = (await BestSellerProductsMap[theme]())?.default;

    return (
        <>
            <h1>LatestProducts</h1>
            <ProductList />
            <CallToAction />
            <BestSellerProducts />
        </>

    )
}
