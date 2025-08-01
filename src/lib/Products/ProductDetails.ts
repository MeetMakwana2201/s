export async function getProductBySlug(slug: string) {
    const sample = {
        slug: 'off-duty-fit-set',
        name: 'OFF-DUTY FIT MATCHING SET',
        // brand: 'CoreFlex',
        category: 'Category 1',
        price: 30,
        originalPrice: 35,
        discount: '10% OFF',
        images: [
            '/images/product-page-image.png',
            '/images/cart-page-image.png',
            '/images/order-history-image.png',
            '/images/auth-flow-image.png',
            '/images/category-page-image.png',
        ],
        colors: [
            { name: 'Black', code: '#1f2937', selected: true },
            { name: 'Blue', code: '#3b82f6', selected: false },
            { name: 'Yellow', code: '#facc15', selected: false },
            { name: 'White', code: '#f3f4f6', selected: false },
        ],
        sizes: ['Small', 'Medium', 'Large', 'Extra-Large'],
        returnEligible: true,
        ProductAvailability: 0,
        SizeChartImage: '/images/size-chart.png',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua            Lorem ipsum dolor sit amet, consectetur adipiscing elit.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    };

    return slug === 'off-duty-fit-set' ? sample : null;
}
