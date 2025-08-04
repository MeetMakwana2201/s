// import CallToAction from '@/components/call-to-action/CallToAction'
// import CategoriesDetails from '@/components/Categories/CategoriesDetails'
// import LatestProducts from '@/components/Products/LatestProducts'
// import ProductList from '@/components/Products/ProductList'
import React from 'react'
import { cookies } from 'next/headers';

export default async function page() {
    type ThemeKey = 'theme1' | 'theme2' | 'theme3';
    const theme = ((await cookies()).get('theme')?.value as ThemeKey) || 'default';

    const CallToActionMap = {
        theme1: () => import('@/components/theme1/call-to-action/CallToAction'),
        theme2: () => import('@/components/theme2/call-to-action/CallToAction'),
        theme3: () => import('@/components/theme3/call-to-action/CallToAction'),
    };
    const CategoriesDetailsMap = {
        theme1: () => import('@/components/theme1/Categories/CategoriesDetails'),
        theme2: () => import('@/components/theme2/Categories/CategoriesDetails'),
        theme3: () => import('@/components/theme3/Categories/CategoriesDetails'),
    };
    const LatestProductsMap = {
        theme1: () => import('@/components/theme1/Products/LatestProducts'),
        theme2: () => import('@/components/theme2/Products/LatestProducts'),
        theme3: () => import('@/components/theme3/Products/LatestProducts'),
    };
    const ProductListMap = {
        theme1: () => import('@/components/theme1/Products/ProductList'),
        theme2: () => import('@/components/theme2/Products/ProductList'),
        theme3: () => import('@/components/theme3/Products/ProductList'),
    };
    const BreadcrumbMap = {
        theme1: () => import('@/components/theme1/Breadcrumb/Breadcrumb'),
        theme2: () => import('@/components/theme2/Breadcrumb/Breadcrumb'),
        theme3: () => import('@/components/theme3/Breadcrumb/Breadcrumb'),
    };

    const CallToAction = (await CallToActionMap[theme]())?.default;
    const CategoriesDetails = (await CategoriesDetailsMap[theme]())?.default;
    const LatestProducts = (await LatestProductsMap[theme]())?.default;
    const ProductList = (await ProductListMap[theme]())?.default;
    const Breadcrumb = (await BreadcrumbMap[theme]())?.default;

    return (
        <>
            <Breadcrumb page="Catogary 1" />
            <CategoriesDetails />
            <ProductList />
            <CallToAction />
            <LatestProducts />
        </>
    )
}
