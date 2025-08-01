// import AuthImge from '@/components/Auth/AuthImge'
// import Login from '@/components/Auth/Login'
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

    const LoginMap = {
        theme1: () => import('@/components/theme1/Auth/Login'),
        theme2: () => import('@/components/theme2/Auth/Login'),
        theme3: () => import('@/components/theme3/Auth/Login'),
    };

    const AuthImge = (await AuthImgeMap[theme]())?.default;
    const Login = (await LoginMap[theme]())?.default;


    return (
        <>
            <AuthImge />
            <Login />
        </>
    )
}
