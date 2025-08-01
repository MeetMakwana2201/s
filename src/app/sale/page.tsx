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
        theme1: () => import('@/components/theme1/Products/SimilarProducts'),
        theme2: () => import('@/components/theme2/Products/SimilarProducts'),
        theme3: () => import('@/components/theme3/Products/SimilarProducts'),
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

    const OfferPoster = (await OfferPosterMap[theme]())?.default;
    const ProductList = (await ProductListMap[theme]())?.default;
    const CallToAction = (await CallToActionMap[theme]())?.default;
    const LatestProducts = (await LatestProductsMap[theme]())?.default;

    // const OfferPoster = (await OfferPosterMap[theme]())?.default;
    // const ProductList = (await ProductListMap[theme]())?.default;
    // const CallToAction = (await CallToActionMap[theme]())?.default;
    // const LatestProducts = (await LatestProductsMap[theme]())?.default;

    // const theme = (await cookies()).get('theme')?.value || 'default';

    // // Dynamically import each themed component
    // const OfferPoster = (await import(`@/components/${theme}/Offer/Offer-Poster`)).default;
    // const ProductList = (await import(`@/components/${theme}/Products/ProductList`)).default;
    // const CallToAction = (await import(`@/components/${theme}/call-to-action/CallToAction`)).default;
    // const LatestProducts = (await import(`@/components/${theme}/Products/LatestProducts`)).default;


    return (
        <>
            <OfferPoster />
            <ProductList />
            <CallToAction />
            <LatestProducts />
        </>
    )
}
