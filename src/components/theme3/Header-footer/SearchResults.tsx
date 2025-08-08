'use client';

import { getProducts } from '@/lib/Products/ProductList';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sheet, SheetHeader, SheetTitle, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Slider } from '@/components/ui/slider'


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

export default function SearchResults({ searchTerm }: { searchTerm: string }) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [products, setProducts] = useState<Product[]>([])
    const [results, setResults] = useState<Product[]>([]);
    const [showMoreColors, setShowMoreColors] = useState(false)
    const [showMoreSizes, setShowMoreSizes] = useState(false)
    const [showMoreCategories, setShowMoreCategories] = useState(false)
    const [showMoreBrands, setShowMoreBrands] = useState(false)
    const [isSheetOpen, setIsSheetOpen] = useState(false) // New state for Sheet open/close

    const initialFilters = {
        priceRange: [10, 50] as [number, number],
        categories: [],
        brands: [],
        sizes: [],
        colors: []
    }
    // State for filters the user is currently selecting in the UI
    const [selectedFilters, setSelectedFilters] = useState<Filters>(initialFilters)

    // State for filters that are actually applied to fetch products
    const [appliedFilters, setAppliedFilters] = useState<Filters>(initialFilters)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                setError(null)
                const data = await getProducts(appliedFilters)
                setProducts(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch products')
                setProducts([])
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [appliedFilters])


    const resetFilters = () => {
        setSelectedFilters(initialFilters)
        setAppliedFilters(initialFilters)
    }

    // Applies the selected filters and closes the sheet
    const applyFilters = () => {
        setAppliedFilters(selectedFilters)
        setIsSheetOpen(false) // Close the sheet
    }

    // Checks if any filters are active
    const hasActiveFilters = () => {
        return (
            selectedFilters.categories.length > 0 ||
            selectedFilters.brands.length > 0 ||
            selectedFilters.sizes.length > 0 ||
            selectedFilters.colors.length > 0 ||
            selectedFilters.priceRange[0] !== 10 ||
            selectedFilters.priceRange[1] !== 50
        )
    }

    // Checks if a specific filter is active in the selected state
    const isFilterActive = (type: keyof Omit<Filters, 'priceRange'>, value: string) => {
        return selectedFilters[type].includes(value)
    }

    useEffect(() => {
        const fetchData = async () => {

            // Provide default filters to fetch all products
            const products: Product[] = await getProducts({
                priceRange: [0, Infinity],
                categories: [],
                brands: [],
                sizes: [],
                colors: [],
            });

            const filtered = products.filter((prod) =>
                prod.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setResults(filtered);
        };

        fetchData();
    }, [searchTerm]);

    if (results.length === 0) {
        return <p className="text-gray-500">No products found.</p>;
    }

    const handlePriceChange = (value: number[]) => {
        setSelectedFilters(prev => ({
            ...prev,
            priceRange: [value[0], value[1]] as [number, number]
        }))
    }

    const handleFilterChange = (type: keyof Omit<Filters, 'priceRange'>, value: string) => {
        setSelectedFilters(prev => {
            // Remove "All" if it exists when selecting specific items
            const currentFilters = prev[type].filter(item => item !== 'All' && item !== 'all')

            return {
                ...prev,
                [type]: currentFilters.includes(value)
                    ? currentFilters.filter(item => item !== value)
                    : [...currentFilters, value]
            }
        })
    }

    const categories = ['T-Shirts', 'Hoodies', 'Jeans', 'Sneakers', 'Accessories']
    const brands = ['Nike', 'Adidas', 'Puma', 'Reebok', 'Under Armour']
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34']
    const colors = [
        { name: 'Black', value: 'black' },
        { name: 'White', value: 'white' },
        { name: 'Red', value: 'red' },
        { name: 'Blue', value: 'blue' },
        { name: 'Green', value: 'green' },
        { name: 'Gray', value: 'gray' }
    ]

    const FilterContent = () => (
        <>
            {/* Price Range */}
            <div className="mb-6">
                <h3 className="font-[outfit] font-black text-xl mb-3">PRICE</h3>
                <div className="relative px-2 pt-5">
                    {/* Absolute price labels */}
                    <span
                        className="absolute -top-2 text-sm text-gray-600"
                        style={{ left: `${(selectedFilters.priceRange[0] / 100) * 100 + 2}%`, transform: 'translateX(-50%)' }}
                    >
                        ${selectedFilters.priceRange[0]}.00
                    </span>
                    <span
                        className="absolute -top-2 text-sm text-gray-600"
                        style={{ left: `${(selectedFilters.priceRange[1] / 100) * 100}%`, transform: 'translateX(-50%)' }}
                    >
                        ${selectedFilters.priceRange[1]}.00
                    </span>

                    <Slider
                        value={selectedFilters.priceRange}
                        onValueChange={handlePriceChange}
                        max={100}
                        min={0}
                        step={5}
                        className="w-full"
                    />
                </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
                <h3 className="font-[outfit] font-black text-xl mb-3">CATEGORIES</h3>
                <div className="flex flex-wrap gap-2">
                    {categories.slice(0, showMoreCategories ? categories.length : 4).map((category: string) => (
                        <button
                            key={category}
                            onClick={() => handleFilterChange('categories', category)}
                            className={`p-3 text-sm border rounded transition-colors ${isFilterActive('categories', category)
                                ? ' text-black border-black font-semibold'
                                : 'border-[#515151] text-[#515151] hover:border-black font-medium'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                {categories.length > 5 && (
                    <button
                        onClick={() => setShowMoreCategories(!showMoreCategories)}
                        className="mt-2 text-center w-full underline text-base font-semibold transition-colors"
                    >
                        {showMoreCategories ? 'View Less' : 'View More'}
                    </button>
                )}
            </div>

            {/* Brand Selection */}
            <div className="mb-6">
                <h3 className="font-[outfit] font-black text-xl mb-3">BRAND SELECTION</h3>
                <div className="flex flex-wrap gap-2">
                    {brands.slice(0, showMoreBrands ? brands.length : 4).map((brand, index) => (
                        <button
                            key={index}
                            onClick={() => handleFilterChange('brands', brand)}
                            className={`p-3 text-sm border rounded transition-colors ${isFilterActive('brands', brand)
                                ? 'text-black border-black font-semibold'
                                : 'border-[#515151] text-[#515151] hover:border-black font-medium'
                                }`}
                        >
                            {brand}
                        </button>
                    ))}
                </div>
                {brands.length > 5 && (
                    <button
                        onClick={() => setShowMoreBrands(!showMoreBrands)}
                        className="mt-2 text-center w-full underline text-base font-semibold transition-colors"
                    >
                        {showMoreBrands ? 'View Less' : 'View More'}
                    </button>
                )}
            </div>

            {/* Sizes */}
            <div className="mb-6">
                <h3 className="font-[outfit] font-black text-xl mb-3">SIZES</h3>
                <div className="flex flex-wrap gap-2">
                    {sizes.slice(0, showMoreSizes ? sizes.length : 4).map(size => (
                        <button
                            key={size}
                            onClick={() => handleFilterChange('sizes', size)}
                            className={`p-3 text-sm border rounded transition-colors ${isFilterActive('sizes', size)
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
                        className="mt-2 text-center w-full underline text-base font-semibold transition-colors"
                    >
                        {showMoreSizes ? 'View Less' : 'View More'}
                    </button>
                )}
            </div>

            {/* Colors */}
            <div className="mb-6">
                <h3 className="font-[outfit] font-black text-xl mb-3">COLORS</h3>
                <div className="flex flex-wrap gap-2">
                    {colors.slice(0, showMoreColors ? colors.length : 4).map((color: string | { value: string; name?: string }, index: number) => {
                        // Handle both string and object formats
                        const colorValue = typeof color === 'string' ? color : color.value
                        const colorName = typeof color === 'string' ? color : (color.name || color.value)

                        return (
                            <button
                                key={index}
                                onClick={() => handleFilterChange('colors', colorValue)}
                                className={`p-3 text-sm border rounded transition-colors ${isFilterActive('colors', colorValue)
                                    ? 'text-black border-black font-semibold'
                                    : 'border-[#515151] text-[#515151] hover:border-black font-medium'
                                    }`}
                            >
                                {colorName}
                            </button>
                        )
                    })}
                </div>
                {colors.length > 5 && (
                    <button
                        onClick={() => setShowMoreColors(!showMoreColors)}
                        className="mt-2 text-center w-full underline text-base font-semibold transition-colors"
                    >
                        {showMoreColors ? 'View Less' : 'View More'}
                    </button>
                )}
            </div>
        </>
    )
    return (
        // <ul className="space-y-2">
        //     {results.map((product) => (
        //         <li key={product.id} className="flex items-center gap-4">
        //             <Image src={product.image} alt={product.name} width={100} height={100} className="w-10 h-10 object-cover rounded" />
        //             <Link href={`/products/${product.name}`} className="text-blue-600 hover:underline">
        //                 {product.name}
        //             </Link>
        //         </li>
        //     ))}
        // </ul>
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
            <div className="py-6">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Desktop Filters Sidebar */}
                    <div className="hidden lg:block lg:w-1/4">
                        <div className="bg-white rounded-lg p-6 border border-[#515151]">
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
                            <FilterContent />
                        </div>
                    </div>

                    {/* Mobile Filters Sheet */}
                    <div className="block lg:hidden">
                        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                            <SheetTrigger asChild>
                                <div className="w-full px-4 py-3 border border-[#515151] rounded text-sm font-medium hover:border-black transition-colors">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-[outfit] font-black">FILTERS</span>
                                        <button
                                            onClick={resetFilters}
                                            disabled={!hasActiveFilters()}
                                            className={`py-2 px-4 border border-gray-400 rounded font-semibold text-sm ${hasActiveFilters()
                                                ? 'hover:bg-gray-50 cursor-pointer'
                                                : 'opacity-50 cursor-not-allowed'
                                                }`}
                                        >
                                            RESET
                                        </button>
                                    </div>
                                </div>
                            </SheetTrigger>

                            <SheetContent side="bottom" className="h-[90svh] overflow-y-auto overflow-x-hidden p-4 border-t bg-white">
                                <SheetHeader className="pb-4">
                                    <SheetTitle className="text-3xl font-[outfit] font-black text-left">FILTERS</SheetTitle>
                                </SheetHeader>

                                <div className="pb-20">
                                    <FilterContent />
                                </div>

                                {/* Bottom Buttons */}
                                <div className="fixed bottom-4 left-4 right-4 flex gap-2 bg-white pt-4 border-t">
                                    <button
                                        onClick={resetFilters}
                                        disabled={!hasActiveFilters()}
                                        className={`flex-1 py-3 border border-gray-400 rounded font-semibold text-sm ${hasActiveFilters()
                                            ? 'hover:bg-gray-50 cursor-pointer'
                                            : 'opacity-50 cursor-not-allowed'
                                            }`}
                                    >
                                        RESET
                                    </button>

                                    <button
                                        onClick={applyFilters}
                                        className="flex-1 py-3 bg-black text-white rounded font-semibold text-sm hover:bg-gray-800"
                                    >
                                        APPLY
                                    </button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

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
                            <div className="grid grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
                                {results.map(product => (
                                    <Link key={product.id} href={`/products/${product.id}`}>
                                        <div className="bg-white rounded-lg overflow-hidden">
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
                                                <h3 className="font-medium mb-2 line-clamp-2">
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
    );
}
