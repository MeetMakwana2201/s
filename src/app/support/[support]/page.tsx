// import Support from '@/components/Support/Support'
import React from 'react'
import { cookies } from 'next/headers';


export default async function page() {
    type ThemeKey = 'theme1' | 'theme2' | 'theme3';
    const theme = ((await cookies()).get('theme')?.value as ThemeKey) || 'default';

    const SupportMap = {
        theme1: () => import('@/components/theme1/Support/Support'),
        theme2: () => import('@/components/theme2/Support/Support'),
        theme3: () => import('@/components/theme3/Support/Support'),
    };

    const Support = (await SupportMap[theme]())?.default;
    
    return (
        <Support />
    )
}
