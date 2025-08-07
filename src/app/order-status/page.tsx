// import OrderFailed from '@/components/order-status/OrderFailed'
// import OrderSuccessfully from '@/components/order-status/OrderSuccessfully'
import React from 'react'
import { cookies } from 'next/headers';

export default async function page() {
    type ThemeKey = 'theme1' | 'theme2' | 'theme3';
    const theme = ((await cookies()).get('theme')?.value as ThemeKey) || 'default';

    const OrderStatusMap = {
        theme1: () => import('@/components/theme1/order-status/OrderStatus'),
        theme2: () => import('@/components/theme2/order-status/OrderStatus'),
        theme3: () => import('@/components/theme3/order-status/OrderStatus'),
    };

    const OrderStatus = (await OrderStatusMap[theme]())?.default;

    return (
        <>
            <OrderStatus />
        </>
    )
}
