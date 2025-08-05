// lib/api/products.ts

// Types
export interface Product {
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

export interface ProductFilters {
    priceRange: [number, number]
    categories: string[]
    brands: string[]
    sizes: string[]
    colors: string[]
}

// Static Data - Replace with API calls later
const staticProducts: Product[] = [
    {
        id: '1',
        name: 'Essential Tee',
        brand: 'CoreFlex',
        price: 28.00,
        originalPrice: 35.00,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop&crop=center',
        category: 'T-Shirt',
        size: ['Small', 'Medium', 'Large'],
        color: 'Purple'
    },
    {
        id: '2',
        name: 'Urban Jogger Classic',
        brand: 'CoreFlex',
        price: 32.00,
        originalPrice: 35.00,
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop&crop=center',
        category: 'Joggers',
        size: ['Small', 'Medium', 'Large'],
        color: 'Gray'
    },
    {
        id: '3',
        name: 'StreetFlex Tee',
        brand: 'CoreFlex',
        price: 27.50,
        originalPrice: 35.00,
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop&crop=center',
        category: 'T-Shirt',
        size: ['Small', 'Medium', 'Large'],
        color: 'Black'
    },
    {
        id: '4',
        name: 'Power Jumpsuit Pro',
        brand: 'CoreFlex',
        price: 36.00,
        originalPrice: 35.00,
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop&crop=center',
        category: 'Jump Suits',
        size: ['Small', 'Medium', 'Large', 'Extra-Large'],
        color: 'Brown'
    },
    {
        id: '5',
        name: 'ActiveFlex Joggers',
        brand: 'CoreFlex',
        price: 29.00,
        originalPrice: 35.00,
        image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&h=500&fit=crop&crop=center',
        category: 'Joggers',
        size: ['Small', 'Medium', 'Large'],
        color: 'White'
    },
    {
        id: '6',
        name: 'Noir Classic Tee',
        brand: 'CoreFlex',
        price: 31.00,
        originalPrice: 35.00,
        image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=500&fit=crop&crop=center',
        category: 'T-Shirt',
        size: ['Medium', 'Large'],
        color: 'Black'
    },
    {
        id: '7',
        name: 'BreezeFit Shorts',
        brand: 'Zenwise',
        price: 26.00,
        originalPrice: 30.00,
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop&crop=center',
        category: 'Shorts',
        size: ['Small', 'Medium', 'Large'],
        color: 'Blue'
    },
    {
        id: '8',
        name: 'Sunset Vibe Tee',
        brand: 'StriveFit',
        price: 33.00,
        originalPrice: 40.00,
        image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=500&fit=crop&crop=center',
        category: 'T-Shirt',
        size: ['Small', 'Medium', 'Large', 'Extra-Large'],
        color: 'Yellow'
    },
    {
        id: '9',
        name: 'Rose Rush Joggers',
        brand: 'GrindGear',
        price: 42.00,
        originalPrice: 45.00,
        image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=400&h=500&fit=crop&crop=center',
        category: 'Joggers',
        size: ['Medium', 'Large', 'Extra-Large'],
        color: 'Pink'
    },
    {
        id: '10',
        name: 'Cloudstep Jumpsuit',
        brand: 'CoreFlex',
        price: 34.00,
        originalPrice: 37.00,
        image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=500&fit=crop&crop=center',
        category: 'Jump Suits',
        size: ['Small', 'Medium'],
        color: 'White'
    },
    {
        id: '11',
        name: 'Zen Flow Shorts',
        brand: 'Zenwise',
        price: 24.50,
        originalPrice: 33.00,
        image: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=400&h=500&fit=crop&crop=center',
        category: 'Shorts',
        size: ['Small', 'Medium', 'Large'],
        color: 'Gray'
    },
    {
        id: '12',
        name: 'Royal Drift Tee',
        brand: 'StriveFit',
        price: 36.00,
        originalPrice: 43.00,
        image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=400&h=500&fit=crop&crop=center',
        category: 'T-Shirt',
        size: ['Large', 'Extra-Large'],
        color: 'Purple'
    }
];


export async function getProducts(filters: ProductFilters): Promise<Product[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))

    try {
        // Filter the static products based on the provided filters
        const filteredProducts = staticProducts.filter(product => {
            const priceInRange = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
            const categoryMatch = filters.categories.length === 0 || filters.categories.includes(product.category)
            const brandMatch = filters.brands.length === 0 || filters.brands.includes(product.brand)
            const sizeMatch = filters.sizes.length === 0 || filters.sizes.some(size => product.size.includes(size))
            const colorMatch = filters.colors.length === 0 || filters.colors.includes(product.color)

            return priceInRange && categoryMatch && brandMatch && sizeMatch && colorMatch
        })

        return filteredProducts

    } catch (error) {
        console.error('Error fetching products:', error)
        throw new Error('Failed to fetch products. Please try again later.')
    }
}