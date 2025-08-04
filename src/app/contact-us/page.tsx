// import ContactUs from '@/components/Support/ContactUs'
import React from 'react'
import { cookies } from 'next/headers';

export default async function page() {

    type ThemeKey = 'theme1' | 'theme2' | 'theme3';
    const theme = ((await cookies()).get('theme')?.value as ThemeKey) || 'default';

    const ContactUsMap = {
        theme1: () => import('@/components/theme1/Support/ContactUs'),
        theme2: () => import('@/components/theme2/Support/ContactUs'),
        theme3: () => import('@/components/theme3/Support/ContactUs'),
    };

    const ContactUs = (await ContactUsMap[theme]())?.default;

    return (
        <ContactUs />
    )
}
