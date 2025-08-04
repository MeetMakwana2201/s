// app/products/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Slider } from '@/components/ui/slider'
import { getProducts } from '@/lib/Products/ProductList'
import { filtersData } from "@/lib/Products/filters";
import { Sheet, SheetHeader, SheetTitle, SheetContent, SheetTrigger } from '@/components/ui/sheet'
// import ExpandableFilter from "@/components/theme1/Products/ExpandableFilter";
// import { cookies } from 'next/headers';

// Types
interface Product {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  category: string
  size: string[]
  color: string
}

interface Filters {
  priceRange: [number, number]
  categories: string[]
  brands: string[]
  sizes: string[]
  colors: string[]
}
interface ExpandableFilterProps {
  title: string;
  children: React.ReactNode;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  type ThemeKey = 'theme1' | 'theme2' | 'theme3';

  const [ExpandableFilter, setExpandableFilter] = useState<React.ComponentType<ExpandableFilterProps> | null>(null);

  useEffect(() => {
    const theme = (document.cookie.match(/theme=([^;]+)/)?.[1] as ThemeKey) || 'theme1';
    const ExpandableFilterMap = {
      theme1: () => import('@/components/theme1/Products/ExpandableFilter'),
      theme2: () => import('@/components/theme2/Products/ExpandableFilter'),
      theme3: () => import('@/components/theme3/Products/ExpandableFilter'),
    };
    ExpandableFilterMap[theme]().then((mod) => {
      setExpandableFilter(mod.default);
    });
  }, []);

  const [filters, setFilters] = useState<Filters>({
    priceRange: [10, 50],
    categories: [],
    brands: [],
    sizes: [],
    colors: []
  })

  // const [showMoreColors, setShowMoreColors] = useState(false)
  // const [showMoreSizes, setShowMoreSizes] = useState(false)

  // Fetch products when filters change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getProducts(filters)
        setProducts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products')
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [filters])

  const handleFilterChange = (type: keyof Omit<Filters, 'priceRange'>, value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(item => item !== value)
        : [...prev[type], value]
    }))
  }

  const handlePriceChange = (value: number[]) => {
    setFilters(prev => ({
      ...prev,
      priceRange: [value[0], value[1]]
    }))
  }

  const resetFilters = () => {
    setFilters({
      priceRange: [10, 50],
      categories: [],
      brands: [],
      sizes: [],
      colors: []
    })
  }

  const applyFilters = () => {
    // Filters are automatically applied through useEffect
    // This could be used for manual apply if needed
    console.log('Current filters applied:', filters)
  }

  const hasActiveFilters = () => {
    return (
      filters.categories.length > 0 ||
      filters.brands.length > 0 ||
      filters.sizes.length > 0 ||
      filters.colors.length > 0 ||
      filters.priceRange[0] !== 10 ||
      filters.priceRange[1] !== 50
    )
  }

  return (
    <div className="min-h-screen">
      <div className="lg:px-12.5 px-3 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg lg:p-6 p-3 border border-[#515151]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-[outfit] font-black">FILTERS</h2>
                <div className="flex gap-2">
                  <button
                    onClick={resetFilters}
                    disabled={!hasActiveFilters()}
                    className={`px-3 py-1 text-sm border border-gray-300 rounded transition-colors ${hasActiveFilters()
                      ? 'hover:bg-gray-50 cursor-pointer'
                      : 'opacity-50 cursor-not-allowed'
                      }`}
                  >
                    RESET
                  </button>
                  <button
                    onClick={applyFilters}
                    className="px-3 py-1 text-sm bg-black text-white rounded hover:bg-gray-800 transition-colors"
                  >
                    APPLY
                  </button>
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-[outfit] font-black text-xl mb-3">PRICE</h3>
                <div className="relative px-2 pt-5">
                  {/* Absolute price labels */}
                  <span
                    className="absolute -top-2 text-sm text-gray-600"
                    style={{ left: `${(filters.priceRange[0] / 100) * 100 + 2}%`, transform: 'translateX(-50%)' }}
                  >
                    ${filters.priceRange[0]}.00
                  </span>
                  <span
                    className="absolute -top-2 text-sm text-gray-600"
                    style={{ left: `${(filters.priceRange[1] / 100) * 100}%`, transform: 'translateX(-50%)' }}
                  >
                    ${filters.priceRange[1]}.00
                  </span>


                  <Slider
                    value={filters.priceRange}
                    onValueChange={handlePriceChange}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                {ExpandableFilter &&
                  filtersData.map((filter) => (
                    <ExpandableFilter key={filter.key} title={filter.title}>
                      {filter.key === "colors" ? (
                        (filter.options as string[]).map((color: string) => (
                          <div
                            key={color}
                            onClick={() => handleFilterChange(filter.key as keyof Omit<Filters, 'priceRange'>, color)}
                            className="w-6 h-6 rounded-full border-2 cursor-pointer"
                            style={{
                              backgroundColor: color,
                              borderColor: filters[filter.key as keyof Omit<Filters, 'priceRange'>]?.includes(color) ? "black" : "#ccc",
                            }}
                          />
                        ))
                      ) : (
                        (filter.options as string[]).map((option: string) => (
                          <button
                            key={option}
                            onClick={() => handleFilterChange(filter.key as keyof Omit<Filters, 'priceRange'>, option)}
                            className={`p-3 text-sm border rounded transition-colors ${filters[filter.key as keyof Omit<Filters, 'priceRange'>]?.includes(option)
                              ? "text-black border-black font-semibold"
                              : "border-[#515151] text-[#515151] hover:border-black font-medium"
                              }`}
                          >
                            {option}
                          </button>
                        ))
                      )}
                    </ExpandableFilter>
                  ))}
              </div>


              {/* Categories */}
              {/* <div className="mb-6">
                <h3 className="font-[outfit] font-black text-xl mb-3">CATEGORIES</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => handleFilterChange('categories', category)}
                      className={`p-3 text-sm border rounded transition-colors ${filters.categories.includes(category)
                        ? ' text-black border-black font-semibold'
                        : 'border-[#515151] text-[#515151] hover:border-black font-medium'
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div> */}

              {/* Brand Selection */}
              {/* <div className="mb-6">
                <h3 className="font-[outfit] font-black text-xl mb-3">BRAND SELECTION</h3>
                <div className="flex flex-wrap gap-2">
                  {brands.map((brand, index) => (
                    <button
                      key={index}
                      onClick={() => handleFilterChange('brands', brand)}
                      className={`p-3 text-sm border rounded transition-colors ${filters.brands.includes(brand)
                        ? 'text-black border-black font-semibold'
                        : 'border-[#515151] text-[#515151] hover:border-black font-medium'
                        }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div> */}

              {/* Sizes */}
              {/* <div className="mb-6">
                <h3 className="font-[outfit] font-black text-xl mb-3">SIZES</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.slice(0, showMoreSizes ? sizes.length : 5).map(size => (
                    <button
                      key={size}
                      onClick={() => handleFilterChange('sizes', size)}
                      className={`p-3 text-sm border rounded transition-colors ${filters.sizes.includes(size)
                        ? 'text-black border-black font-semibold'
                        : 'border-[#515151] text-[#515151] hover:border-black font-medium'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {sizes.length > 5 && (
                  <button
                    onClick={() => setShowMoreSizes(!showMoreSizes)}
                    className="mt-2 text-center w-full underline text-base font-semibold  transition-colors"
                  >
                    {showMoreSizes ? 'View Less' : 'View More'}
                  </button>
                )}
              </div> */}

              {/* Colors */}
              {/* <div className="mb-6">
                <h3 className="font-[outfit] font-black text-xl mb-3">COLORS</h3>
                <div className="flex flex-wrap gap-2">
                  {colors.slice(0, showMoreColors ? colors.length : 5).map(color => (
                    <button
                      key={color.value}
                      onClick={() => handleFilterChange('colors', color.value)}
                      className={`p-3 text-sm border rounded transition-colors ${filters.colors.includes(color.value)
                        ? 'text-black border-black font-semibold'
                        : 'border-[#515151] text-[#515151] hover:border-black font-medium'
                        }`}
                    >
                      {color.name}
                    </button>
                  ))}
                </div>
                {colors.length > 5 && (
                  <button
                    onClick={() => setShowMoreColors(!showMoreColors)}
                    className="mt-2 text-center w-full underline text-base font-semibold  transition-colors"
                  >
                    {showMoreColors ? 'View Less' : 'View More'}
                  </button>
                )}
              </div> */}
            </div>
          </div>
          {/* Filters responsive */}
          <Sheet>
            <SheetTrigger asChild>
              <div className="block lg:hidden px-4 py-2 border rounded text-sm font-medium">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-[outfit] font-black">FILTERS</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={resetFilters}
                      disabled={!hasActiveFilters()}
                      className={`px-3 py-1 text-sm border border-gray-300 rounded transition-colors ${hasActiveFilters()
                        ? 'hover:bg-gray-50 cursor-pointer'
                        : 'opacity-50 cursor-not-allowed'
                        }`}
                    >
                      RESET
                    </button>
                    <button
                      onClick={applyFilters}
                      className="px-3 py-1 text-sm bg-black text-white rounded hover:bg-gray-800 transition-colors"
                    >
                      APPLY
                    </button>
                  </div>
                </div>
              </div>
            </SheetTrigger>

            <SheetContent side="bottom" className="h-[93vh] overflow-y-auto p-4  border-t bg-white ">
              <SheetHeader className="p-0">
                <h2 className="text-3xl font-[outfit] font-black">FILTERS</h2>
              </SheetHeader>

              <div>
                {ExpandableFilter &&
                  filtersData.map((filter) => (
                    <ExpandableFilter key={filter.key} title={filter.title}>
                      {filter.key === "colors" ? (
                        (filter.options as string[]).map((color: string) => (
                          <div
                            key={color}
                            onClick={() => handleFilterChange(filter.key as keyof Omit<Filters, 'priceRange'>, color)}
                            className="w-6 h-6 rounded-full border-2 cursor-pointer"
                            style={{
                              backgroundColor: color,
                              borderColor: filters[filter.key as keyof Omit<Filters, 'priceRange'>]?.includes(color) ? "black" : "#ccc",
                            }}
                          />
                        ))
                      ) : (
                        (filter.options as string[]).map((option: string) => (
                          <button
                            key={option}
                            onClick={() => handleFilterChange(filter.key as keyof Omit<Filters, 'priceRange'>, option)}
                            className={`p-3 text-sm border rounded transition-colors ${filters[filter.key as keyof Omit<Filters, 'priceRange'>]?.includes(option)
                              ? "text-black border-black font-semibold"
                              : "border-[#515151] text-[#515151] hover:border-black font-medium"
                              }`}
                          >
                            {option}
                          </button>
                        ))
                      )}
                    </ExpandableFilter>
                  ))}
              </div>

              {/* Bottom Buttons */}
              <div className="flex justify-between gap-2 mt-6 bottom-4 absolute w-[90%]">
                <button
                  onClick={resetFilters}
                  disabled={!hasActiveFilters()}
                  className={`w-full py-2 border border-gray-400 rounded font-semibold text-sm ${hasActiveFilters()
                    ? 'hover:bg-gray-50 cursor-pointer'
                    : 'opacity-50 cursor-not-allowed'
                    }`}
                >
                  RESET
                </button>

                <button
                  onClick={applyFilters}
                  className="w-full py-2 bg-black text-white rounded font-semibold text-sm hover:bg-gray-800"
                >
                  APPLY
                </button>
              </div>
            </SheetContent>
          </Sheet>


          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Loading State */}
            {loading && (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
                    <div className="aspect-square bg-gray-200"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-12">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                  <p className="text-red-800 mb-4">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {/* Products Grid */}
            {!loading && !error && (
              <div className="grid grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3  gap-6">
                {products.map(product => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <div className="bg-white rounded-lg overflow-hidden transition-shadow">
                      <div className="aspect-square bg-gray-100 relative overflow-hidden">
                        <Image
                          src={product.image || ''}
                          alt={product.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div className="py-4">
                        <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                        <h3 className="font-medium mb-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">${product.price.toFixed(2)}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* No Products Found */}
            {!loading && !error && products.length === 0 && (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="bg-gray-50 rounded-lg p-8">
                    <p className="text-gray-600 mb-4">No products found matching your filters.</p>
                    <p className="text-sm text-gray-500 mb-6">
                      Try adjusting your filters or search criteria to find what youre looking for.
                    </p>
                    <button
                      onClick={resetFilters}
                      className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
                    >
                      Reset All Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}