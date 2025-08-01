// import OrderHistory from '@/components/manu-pages/OrderHistory'
// import ReasonForReturn from '@/components/manu-pages/ReasonForReturn'
import React from 'react'
import { cookies } from 'next/headers';

export default async function page() {
    type ThemeKey = 'theme1' | 'theme2' | 'theme3';
    const theme = ((await cookies()).get('theme')?.value as ThemeKey) || 'default';

    const OrderHistoryMap = {
        theme1: () => import('@/components/theme1/manu-pages/OrderHistory'),
        theme2: () => import('@/components/theme2/manu-pages/OrderHistory'),
        theme3: () => import('@/components/theme3/manu-pages/OrderHistory'),
    };
    const ReasonForReturnMap = {
        theme1: () => import('@/components/theme1/manu-pages/ReasonForReturn'),
        theme2: () => import('@/components/theme2/manu-pages/ReasonForReturn'),
        theme3: () => import('@/components/theme3/manu-pages/ReasonForReturn'),
    };

    const OrderHistory = (await OrderHistoryMap[theme]())?.default;
    const ReasonForReturn = (await ReasonForReturnMap[theme]())?.default;

    return (
        <>
            <OrderHistory />
            <ReasonForReturn />
        </>
    )
}
