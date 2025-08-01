// import CallToAction from '@/components/call-to-action/CallToAction'
// import Categories from '@/components/Categories/CategoriesSlider'
// import HomeHero from '@/components/Home/HomeHero'
// import OfferSection from '@/components/Offer/OfferSection'
// import BestSellerProducts from '@/components/Products/BestSellerProducts'
// import Catalog from '@/components/Products/Catalog/CatalogSection'
// import LatestProducts from '@/components/Products/LatestProducts'
import { cookies } from 'next/headers';


export default async function page() {
  const theme = (await cookies()).get('theme')?.value || 'default';

  // Dynamically import each themed component
  const HomeHero = (await import(`@/components/${theme}/Home/HomeHero`)).default;
  const OfferSection = (await import(`@/components/${theme}/Offer/OfferSection`)).default;
  const BestSellerProducts = (await import(`@/components/${theme}/Products/BestSellerProducts`)).default;
  const Catalog = (await import(`@/components/${theme}/Products/Catalog/CatalogSection`)).default;
  const Categories = (await import(`@/components/${theme}/Categories/CategoriesSlider`)).default;
  const CallToAction = (await import(`@/components/${theme}/call-to-action/CallToAction`)).default;
  const LatestProducts = (await import(`@/components/${theme}/Products/LatestProducts`)).default;

  return (
    <div>
      <HomeHero />
      <Categories />
      <OfferSection />
      <BestSellerProducts />
      <Catalog />
      <LatestProducts />
      <CallToAction />
    </div>
  )
}
