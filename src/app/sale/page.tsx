// import CallToAction from '@/components/call-to-action/CallToAction'
// import OfferPoster from '@/components/Offer/Offer-Poster'
// import LatestProducts from '@/components/Products/LatestProducts'
// import ProductList from '@/components/Products/ProductList'
import { cookies } from 'next/headers';


export default async function page() {

    type ThemeKey = 'theme1' | 'theme2' | 'theme3';
    const theme = ((await cookies()).get('theme')?.value as ThemeKey) || 'default';

    const OfferPosterMap = {
        theme1: () => import('@/components/theme1/Offer/Offer-Poster'),
        theme2: () => import('@/components/theme2/Offer/Offer-Poster'),
        theme3: () => import('@/components/theme3/Offer/Offer-Poster'),
    };

    const ProductListMap = {
        theme1: () => import('@/components/theme1/Products/ProductList'),
        theme2: () => import('@/components/theme2/Products/ProductList'),
        theme3: () => import('@/components/theme3/Products/ProductList'),
    };

    const CallToActionMap = {
        theme1: () => import('@/components/theme1/call-to-action/CallToAction'),
        theme2: () => import('@/components/theme2/call-to-action/CallToAction'),
        theme3: () => import('@/components/theme3/call-to-action/CallToAction'),
    };

    const LatestProductsMap = {
        theme1: () => import('@/components/theme1/Products/LatestProducts'),
        theme2: () => import('@/components/theme2/Products/LatestProducts'),
        theme3: () => import('@/components/theme3/Products/LatestProducts'),
    };

    const BreadcrumbMap = {
        theme1: () => import('@/components/theme1/Breadcrumb/Breadcrumb'),
        theme2: () => import('@/components/theme2/Breadcrumb/Breadcrumb'),
        theme3: () => import('@/components/theme3/Breadcrumb/Breadcrumb'),
    };

    const OfferPoster = (await OfferPosterMap[theme]())?.default;
    const ProductList = (await ProductListMap[theme]())?.default;
    const CallToAction = (await CallToActionMap[theme]())?.default;
    const LatestProducts = (await LatestProductsMap[theme]())?.default;
    const Breadcrumb = (await BreadcrumbMap[theme]())?.default;

    return (
        <>
            <Breadcrumb page="Black Friday Sale" />
            <OfferPoster />
            <ProductList />
            <CallToAction />
            <LatestProducts />
        </>
    )
}
