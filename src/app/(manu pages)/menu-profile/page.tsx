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

    const MenuProfile = (await MenuProfileMap[theme]())?.default;
    return (
        <>
            <MenuProfile />
        </>
    )
}
