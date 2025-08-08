import React from 'react'
import { cookies } from 'next/headers';
import { productCategories } from '@/lib/categories/CategoriesDetails';
import CategoriesDetailsInner from '@/components/theme1/Categories/CategoriesDetailsInner';


export default async function CategoriesDetails() {
  type ThemeKey = 'theme1' | 'theme2' | 'theme3';
  const theme = ((await cookies()).get('theme')?.value as ThemeKey) || 'default';

  const BreadcrumbMap = {
    theme1: () => import('@/components/theme1/Breadcrumb/Breadcrumb'),
    theme2: () => import('@/components/theme2/Breadcrumb/Breadcrumb'),
    theme3: () => import('@/components/theme3/Breadcrumb/Breadcrumb'),
  };
  const Breadcrumb = (await BreadcrumbMap[theme]())?.default;

  const data = productCategories[0];

  return (
    <>
      <Breadcrumb page={data.title} />
      <CategoriesDetailsInner
        title={data.title}
        description={data.description}
        imageUrl={data.imageUrl}
        availableCount={data.availableCount}
      />
    </>
  )
}
