import { cookies } from 'next/headers';
import React from 'react';

export default async function page() {
    type ThemeKey = 'theme1' | 'theme2' | 'theme3';
    const theme = ((await cookies()).get('theme')?.value as ThemeKey) || 'default';

    const AuthImgeMap = {
        theme1: () => import('@/components/theme1/Auth/AuthImge'),
        theme2: () => import('@/components/theme2/Auth/AuthImge'),
        theme3: () => import('@/components/theme3/Auth/AuthImge'),
    };

    const ForgetPasswordMap = {
        theme1: () => import('@/components/theme1/Auth/ForgotPassword'),
        theme2: () => import('@/components/theme2/Auth/ForgotPassword'),
        theme3: () => import('@/components/theme3/Auth/ForgotPassword'),
    };

    const AuthImge = (await AuthImgeMap[theme]())?.default;
    const ForgetPassword = (await ForgetPasswordMap[theme]())?.default;

    return (
        <div className="md:min-h-screen mb-4 mt-18 lg:mt-25 px-5 lg:px-9 grid md:grid-cols-2 gap-3 md:gap-0 items-center bg-white">
            <AuthImge />
            <ForgetPassword />
        </div>
    );
}
