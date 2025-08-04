// import Checkout from '@/components/cart-checkout/Checkout'
import React from 'react'
import { cookies } from 'next/headers';

export default async function page() {
    type ThemeKey = 'theme1' | 'theme2' | 'theme3';
    const theme = ((await cookies()).get('theme')?.value as ThemeKey) || 'default';

    const CheckoutMap = {
        theme1: () => import('@/components/theme1/cart-checkout/Checkout'),
        theme2: () => import('@/components/theme2/cart-checkout/Checkout'),
        theme3: () => import('@/components/theme3/cart-checkout/Checkout'),
    };

    const Checkout = (await CheckoutMap[theme]())?.default;

    return (
        <Checkout />
    )
}
