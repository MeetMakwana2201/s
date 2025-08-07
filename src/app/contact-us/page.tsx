// import ContactUs from '@/components/Support/ContactUs'
import React from 'react'
import { cookies } from 'next/headers';

export default async function page() {

    type ThemeKey = 'theme1' | 'theme2' | 'theme3';
    const theme = ((await cookies()).get('theme')?.value as ThemeKey) || 'default';

    const ContactFormMap = {
        theme1: () => import('@/components/theme1/Support/contact/ContactForm'),
        theme2: () => import('@/components/theme2/Support/contact/ContactForm'),
        theme3: () => import('@/components/theme3/Support/contact/ContactForm'),
    };

    const ContactInfoMap = {
        theme1: () => import('@/components/theme1/Support/contact/ContactInfo'),
        theme2: () => import('@/components/theme2/Support/contact/ContactInfo'),
        theme3: () => import('@/components/theme3/Support/contact/ContactInfo'),
    };

    const ActiveTicketsMap = {
        theme1: () => import('@/components/theme1/Support/contact/ActiveTickets'),
        theme2: () => import('@/components/theme2/Support/contact/ActiveTickets'),
        theme3: () => import('@/components/theme3/Support/contact/ActiveTickets'),
    };

    const BreadcrumbMap = {
        theme1: () => import('@/components/theme1/Breadcrumb/Breadcrumb'),
        theme2: () => import('@/components/theme2/Breadcrumb/Breadcrumb'),
        theme3: () => import('@/components/theme3/Breadcrumb/Breadcrumb'),
    };

    const ActiveTickets = (await ActiveTicketsMap[theme]())?.default;
    const ContactInfo = (await ContactInfoMap[theme]())?.default;
    const ContactForm = (await ContactFormMap[theme]())?.default;
    const Breadcrumb = (await BreadcrumbMap[theme]())?.default;

    return (
        <div>
            <Breadcrumb page="Contact Us" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 xl:px-12">
                <ContactInfo />
                <ContactForm />
            </div>
            <ActiveTickets />
        </div>
    )
}
