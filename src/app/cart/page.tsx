// import Cart from '@/components/cart-checkout/Cart'
import React from 'react'
import { cookies } from 'next/headers';

export default async function page() {
    type ThemeKey = 'theme1' | 'theme2' | 'theme3';
    const theme = ((await cookies()).get('theme')?.value as ThemeKey) || 'default';

    const CartMap = {
        theme1: () => import('@/components/theme1/cart-checkout/Cart'),
        theme2: () => import('@/components/theme2/cart-checkout/Cart'),
        theme3: () => import('@/components/theme3/cart-checkout/Cart'),
    };

    const Cart = (await CartMap[theme]())?.default;

    return (
        <Cart />
    )
}
