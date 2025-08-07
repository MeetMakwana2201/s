// import MenuProfile from '@/components/manu-pages/MenuProfile'
import React from 'react'
import { cookies } from 'next/headers';

export default async function page() {
    type ThemeKey = 'theme1' | 'theme2' | 'theme3';
    const theme = ((await cookies()).get('theme')?.value as ThemeKey) || 'default';

    const MenuProfileMap = {
        theme1: () => import('@/components/theme1/manu-pages/MenuProfile'),
        theme2: () => import('@/components/theme2/manu-pages/MenuProfile'),
        theme3: () => import('@/components/theme3/manu-pages/MenuProfile'),
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
    const MenuProfile = (await MenuProfileMap[theme]())?.default;
    const Breadcrumb = (await BreadcrumbMap[theme]())?.default;

    return (
        <>
            <Breadcrumb page="Profile" />
            <div className="flex min-h-screen lg:px-12.5 px-3 ">
                <ManuSidebar active="Profile" />
                <main className="flex-1 p-6">
                    <MenuProfile />
                </main>
            </div>
        </>
    )
}
