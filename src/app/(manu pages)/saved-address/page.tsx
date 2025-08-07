// import AddAddress from '@/components/manu-pages/AddAddress'
// import SavedAddresses from '@/components/manu-pages/SavedAddresses'
import React from 'react'
import { cookies } from 'next/headers';


export default async function page() {
    type ThemeKey = 'theme1' | 'theme2' | 'theme3';
    const theme = ((await cookies()).get('theme')?.value as ThemeKey) || 'default';

    const SavedAddressesMap = {
        theme1: () => import('@/components/theme1/manu-pages/SavedAddresses'),
        theme2: () => import('@/components/theme2/manu-pages/SavedAddresses'),
        theme3: () => import('@/components/theme3/manu-pages/SavedAddresses'),
    };

    const BreadcrumbMap = {
        theme1: () => import('@/components/theme1/Breadcrumb/Breadcrumb'),
        theme2: () => import('@/components/theme2/Breadcrumb/Breadcrumb'),
        theme3: () => import('@/components/theme3/Breadcrumb/Breadcrumb'),
    };

    const ManuSidebarMap = {
        theme1: () => import('@/components/theme1/manu-pages/ManuSidebar'),
        theme2: () => import('@/components/theme2/manu-pages/ManuSidebar'),
        theme3: () => import('@/components/theme3/manu-pages/ManuSidebar'),
    };

    const ManuSidebar = (await ManuSidebarMap[theme]())?.default;
    const Breadcrumb = (await BreadcrumbMap[theme]())?.default;
    const SavedAddresses = (await SavedAddressesMap[theme]())?.default;

    return (
        <>
            <Breadcrumb page="Saved Addresses" />
            <div className="flex lg:min-h-screen lg:px-12.5 px-4 ">
                <ManuSidebar active="Saved Addresses" />
                <SavedAddresses />
            </div>

        </>
    )
}
