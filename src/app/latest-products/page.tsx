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

    const BreadcrumbMap = {
        theme1: () => import('@/components/theme1/Breadcrumb/Breadcrumb'),
        theme2: () => import('@/components/theme2/Breadcrumb/Breadcrumb'),
        theme3: () => import('@/components/theme3/Breadcrumb/Breadcrumb'),
    };

    const ProductList = (await ProductListMap[theme]())?.default;
    const CallToAction = (await CallToActionMap[theme]())?.default;
    const BestSellerProducts = (await BestSellerProductsMap[theme]())?.default;
    const Breadcrumb = (await BreadcrumbMap[theme]())?.default;

    return (
        <div>
            <Breadcrumb page="Latest Products" />
            <h1 className='font-[Outfit] font-black text-3xl lg:px-12.5 px-3 '>our latest products</h1>
            <ProductList />
            <CallToAction />
            <BestSellerProducts />
        </div>

    )
}
