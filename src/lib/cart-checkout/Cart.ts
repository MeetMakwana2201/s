type CartItem = {
    id: number;
    name: string;
    brand: string;
    price: number;
    originalPrice: number;
    color: string;
    size: string;
    quantity: number;
    imageUrl: string;
    availableColors: string[];
    availableSizes: string[];
};

export const initialItems: CartItem[] = [
    {
        id: 1,
        name: "HyperDrive Power Set",
        brand: "CoreFlex",
        price: 30.0,
        originalPrice: 39.0,
        color: "Black",
        size: "Small",
        quantity: 2,
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop&crop=center",
        availableColors: ["Black", "White", "Red"],
        availableSizes: ["Small", "Medium", "Large"],
    },
    {
        id: 2,
        name: "StormRider Training Set",
        brand: "CoreFlex",
        price: 30.0,
        originalPrice: 39.0,
        color: "Black",
        size: "Small",
        quantity: 2,
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop&crop=center",
        availableColors: ["Black", "Blue", "Gray"],
        availableSizes: ["Small", "Medium", "Large", "XL"],
    },
    {
        id: 3,
        name: "HyperDrive Power Set",
        brand: "CoreFlex",
        price: 30.0,
        originalPrice: 39.0,
        color: "Black",
        size: "Small",
        quantity: 2,
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop&crop=center",
        availableColors: ["Black", "White", "Red"],
        availableSizes: ["Small", "Medium", "Large"],
    },
    {
        id: 4,
        name: "StormRider Training Set",
        brand: "CoreFlex",
        price: 30.0,
        originalPrice: 39.0,
        color: "Black",
        size: "Small",
        quantity: 2,
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop&crop=center",
        availableColors: ["Black", "Blue", "Gray"],
        availableSizes: ["Small", "Medium", "Large", "XL"],
    },
    {
        id: 5,
        name: "HyperDrive Power Set",
        brand: "CoreFlex",
        price: 30.0,
        originalPrice: 39.0,
        color: "Black",
        size: "Small",
        quantity: 2,
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop&crop=center",
        availableColors: ["Black", "White", "Red"],
        availableSizes: ["Small", "Medium", "Large"],
    },
    {
        id: 6,
        name: "StormRider Training Set",
        brand: "CoreFlex",
        price: 30.0,
        originalPrice: 39.0,
        color: "Black",
        size: "Small",
        quantity: 2,
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop&crop=center",
        availableColors: ["Black", "Blue", "Gray"],
        availableSizes: ["Small", "Medium", "Large", "XL"],
    },

];
