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

    const [AuthImgeMod, ForgetPasswordMod] = await Promise.all([
        AuthImgeMap[theme](),
        ForgetPasswordMap[theme](),
    ]);

    const AuthImge = AuthImgeMod.default;
    const ForgetPassword = ForgetPasswordMod.default;

    return (
        <>
            <AuthImge />
            <ForgetPassword />
        </>
    );
}
