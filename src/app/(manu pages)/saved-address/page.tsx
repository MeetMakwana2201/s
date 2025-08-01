// import AddAddress from '@/components/manu-pages/AddAddress'
// import SavedAddresses from '@/components/manu-pages/SavedAddresses'
import React from 'react'
import { cookies } from 'next/headers';


export default async function page() {
    type ThemeKey = 'theme1' | 'theme2' | 'theme3';
    const theme = ((await cookies()).get('theme')?.value as ThemeKey) || 'default';

    const SavedAddressesMap = {
        theme1: () => import('@/components/theme1/manu-pages/SavedAddresses'),
        theme2: () => import('@/components/theme2/manu-pages/SavedAddresses'),
        theme3: () => import('@/components/theme3/manu-pages/SavedAddresses'),
    };

    const AddAddressMap = {
        theme1: () => import('@/components/theme1/manu-pages/AddAddress'),
        theme2: () => import('@/components/theme2/manu-pages/AddAddress'),
        theme3: () => import('@/components/theme3/manu-pages/AddAddress'),
    };

    const SavedAddresses = (await SavedAddressesMap[theme]())?.default;
    const AddAddress = (await AddAddressMap[theme]())?.default;

    return (
        <>
            <SavedAddresses />
            <AddAddress />
        </>
    )
}
