// import CallToAction from '@/components/call-to-action/CallToAction'
// import CategoriesList from '@/components/Categories/CategoriesList'
// import LatestProducts from '@/components/Products/LatestProducts'
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
    const CategoriesListMap = {
        theme1: () => import('@/components/theme1/Categories/CategoriesList'),
        theme2: () => import('@/components/theme2/Categories/CategoriesList'),
        theme3: () => import('@/components/theme3/Categories/CategoriesList'),
    };
    const LatestProductsMap = {
        theme1: () => import('@/components/theme1/Products/LatestProducts'),
        theme2: () => import('@/components/theme2/Products/LatestProducts'),
        theme3: () => import('@/components/theme3/Products/LatestProducts'),
    };

    const BreadcrumbMap = {
        theme1: () => import('@/components/theme1/Breadcrumb/Breadcrumb'),
        theme2: () => import('@/components/theme2/Breadcrumb/Breadcrumb'),
        theme3: () => import('@/components/theme3/Breadcrumb/Breadcrumb'),
    };

    const CallToAction = (await CallToActionMap[theme]())?.default;
    const CategoriesList = (await CategoriesListMap[theme]())?.default;
    const LatestProducts = (await LatestProductsMap[theme]())?.default;
    const Breadcrumb = (await BreadcrumbMap[theme]())?.default;

    return (
        <>
            <Breadcrumb page="Categories" />
            <h1 className='font-[Outfit] font-black text-xl lg:text-3xl lg:px-12.5 px-3 uppercase'>Our Category</h1>
            <CategoriesList />
            <CallToAction />
            <LatestProducts />
        </>
    )
}
