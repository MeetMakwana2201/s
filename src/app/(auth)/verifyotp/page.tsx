// import AuthImge from '@/components/Auth/AuthImge'
// import VerifyOTP from '@/components/Auth/VerifyOTP'
import React from 'react'
import { cookies } from 'next/headers';

export default async function page() {
    type ThemeKey = 'theme1' | 'theme2' | 'theme3';
    const theme = ((await cookies()).get('theme')?.value as ThemeKey) || 'default';

    const AuthImgeMap = {
        theme1: () => import('@/components/theme1/Auth/AuthImge'),
        theme2: () => import('@/components/theme2/Auth/AuthImge'),
        theme3: () => import('@/components/theme3/Auth/AuthImge'),
    };

    const VerifyOTPMap = {
        theme1: () => import('@/components/theme1/Auth/VerifyOTP'),
        theme2: () => import('@/components/theme2/Auth/VerifyOTP'),
        theme3: () => import('@/components/theme3/Auth/VerifyOTP'),
    };

    const AuthImge = (await AuthImgeMap[theme]())?.default;
    const VerifyOTP = (await VerifyOTPMap[theme]())?.default;

    return (
        <>
            <AuthImge />
            <VerifyOTP />
        </>
    )
}
