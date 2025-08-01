import React from 'react'
import { cookies } from 'next/headers';
// import AuthImge from '@/components/Auth/AuthImge'
// import Signup from '@/components/Auth/Signup'

export default async function page() {

    type ThemeKey = 'theme1' | 'theme2' | 'theme3';
    const theme = ((await cookies()).get('theme')?.value as ThemeKey) || 'default';

    const AuthImgeMap = {
        theme1: () => import('@/components/theme1/Auth/AuthImge'),
        theme2: () => import('@/components/theme2/Auth/AuthImge'),
        theme3: () => import('@/components/theme3/Auth/AuthImge'),
    };

    const SignupMap = {
        theme1: () => import('@/components/theme1/Auth/Signup'),
        theme2: () => import('@/components/theme2/Auth/Signup'),
        theme3: () => import('@/components/theme3/Auth/Signup'),
    };

    const AuthImge = (await AuthImgeMap[theme]())?.default;
    const Signup = (await SignupMap[theme]())?.default;

    return (
        <>
            <AuthImge />
            <Signup />
        </>
    )
}
