type ProductCategory = {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    availableCount: number;
};

export const productCategories: ProductCategory[] = [
    {
        id: '1',
        title: 'Mens Wear',
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim Lorem ipsum do",
        imageUrl: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg',
        availableCount: 30,
    }
];
