// import OrderFailed from '@/components/order-status/OrderFailed'
// import OrderSuccessfully from '@/components/order-status/OrderSuccessfully'
import React from 'react'
import { cookies } from 'next/headers';

export default async function page() {
    type ThemeKey = 'theme1' | 'theme2' | 'theme3';
    const theme = ((await cookies()).get('theme')?.value as ThemeKey) || 'default';

    const OrderSuccessfullyMap = {
        theme1: () => import('@/components/theme1/order-status/OrderSuccessfully'),
        theme2: () => import('@/components/theme2/order-status/OrderSuccessfully'),
        theme3: () => import('@/components/theme3/order-status/OrderSuccessfully'),
    };
    const OrderFailedMap = {
        theme1: () => import('@/components/theme1/order-status/OrderFailed'),
        theme2: () => import('@/components/theme2/order-status/OrderFailed'),
        theme3: () => import('@/components/theme3/order-status/OrderFailed'),
    };

    const OrderSuccessfully = (await OrderSuccessfullyMap[theme]())?.default;
    const OrderFailed = (await OrderFailedMap[theme]())?.default;

    return (
        <>
            <OrderSuccessfully />
            <OrderFailed />
        </>
    )
}
