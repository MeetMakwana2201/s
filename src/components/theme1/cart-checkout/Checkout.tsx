'use client';

import React, { useState, useEffect, useMemo, ChangeEvent } from 'react';
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ContactInfo {
    email: string;
}

interface ShippingAddress {
    id: string;
    type: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    zip: string;
    state: string;
    country: string;
}

interface CartItem {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    color: string;
    size: string;
    quantity: number;
    imageUrl: string;
}

interface Discount {
    code: string;
    amount: number;
}

const mockContactInfo: ContactInfo = {
    email: 'john.doe@example.com',
};

const mockShippingAddresses: ShippingAddress[] = [
    {
        id: 'address1',
        type: 'HOME',
        addressLine1: '1234 East Willow Creek Boulevard, Penthouse Suite 5B',
        addressLine2: 'Greenview Executive Residency Downtown District',
        city: 'Los Angeles',
        zip: '90001',
        state: 'California',
        country: 'USA',
    },
    {
        id: 'address2',
        type: 'WORK',
        addressLine1: '5678 Commerce Street, Suite 100',
        addressLine2: 'Business Park North',
        city: 'Los Angeles',
        zip: '90002',
        state: 'California',
        country: 'USA',
    },
];

const mockCartItems: CartItem[] = [
    {
        id: 'product1',
        name: 'CoreFlex Dress1',
        price: 30.0,
        originalPrice: 30.0,
        color: 'Black',
        size: 'Small',
        quantity: 2,
        imageUrl: '/images/hero-section-image.png',
    },
    {
        id: 'product2',
        name: 'CoreFlex Dress1',
        price: 30.0,
        originalPrice: 30.0,
        color: 'Black',
        size: 'Small',
        quantity: 1,
        imageUrl: '/images/hero-section-image.png',
    },
];

const mockDiscount: Discount = {
    code: 'FLAT50',
    amount: 5.0,
};

export default function App() {
    const [contactInfo, setContactInfo] = useState<ContactInfo>({ email: '' });
    const [shippingAddresses, setShippingAddresses] = useState<ShippingAddress[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [discountCode, setDiscountCode] = useState<string>('');
    const [appliedDiscountAmount, setAppliedDiscountAmount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Simulate fetching data
        setTimeout(() => {
            setContactInfo(mockContactInfo);
            setShippingAddresses(mockShippingAddresses);
            setCartItems(mockCartItems);
            setDiscountCode(mockDiscount.code);
            setAppliedDiscountAmount(mockDiscount.amount);
            setSelectedAddress(mockShippingAddresses[0].id);
            setLoading(false);
        }, 1000);
    }, []);

    const handleContactChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContactInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddressChange = (id: string) => {
        setSelectedAddress(id);
    };

    const handleDiscountApply = () => {
        // Simulate logic (replace with your own)
        setAppliedDiscountAmount(10); // e.g., ₹10 off
    };

    const handleDiscountRemove = () => {
        setDiscountCode('');
        setAppliedDiscountAmount(0);
    };

    const handleCheckout = () => {
        console.log('Checkout initiated with:', contactInfo)
    };


    const subtotal = useMemo(
        () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        [cartItems]
    );

    const discount = useMemo(() => appliedDiscountAmount, [appliedDiscountAmount]);

    const tax = useMemo(() => parseFloat((subtotal * 0.08).toFixed(2)), [subtotal]);

    const total = useMemo(() => subtotal - discount + tax, [subtotal, discount, tax]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-lg font-medium text-gray-700">Loading checkout details...</div>
            </div>
        );
    }



    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 lg:px-12.5 px-3">
            {/* Left Column */}
            <div className="bg-white rounded-lg space-y-8">
                <h1 className="text-4xl font-black font-[outfit] mb-4 uppercase">Checkout</h1>
                {/* Contact Info */}
                <div>
                    <h2 className="text-xl font-black font-[outfit] uppercase mb-4">CONTACT INFORMATION</h2>
                    <div className="space-y-4">
                        <input
                            type="email"
                            name="email"
                            onChange={handleContactChange}
                            placeholder="Email Address"
                            className="w-full border border-black px-3 py-2 rounded-md"
                        />
                    </div>
                </div>

                {/* Address */}
                <div>
                    <h2 className="text-xl font-black font-[outfit] mb-4 uppercase flex justify-between">
                        SHIPPING ADDRESS
                        <button className="text-blue-600 text-sm">Add Address</button>
                    </h2>
                    <div className="space-y-4">
                        {shippingAddresses.map((address) => (
                            <label
                                key={address.id}
                                className={`border p-4 rounded-md flex items-center cursor-pointer ${selectedAddress === address.id
                                    ? 'border-black'
                                    : 'border-gray-200 '
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="address"
                                    checked={selectedAddress === address.id}
                                    onChange={() => handleAddressChange(address.id)}
                                    className="mr-2 h-5 w-5 rounded-full border-2 border-black appearance-none  checked:border-black checked:ring-2 checked:ring-black"
                                />
                                <div>
                                    <strong>{address.type}</strong>
                                    <p>{address.addressLine1}, {address.addressLine2}</p>
                                    <p>{address.city} | {address.zip} | {address.state} | {address.country}</p>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Discount */}
                <div>
                    <h2 className="text-xl font-black font-[outfit] mb-4 uppercase">DISCOUNT</h2>
                    <div className="flex items-center border p-2.5 rounded-xl border-black space-x-2">
                        <input
                            type="text"
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                            placeholder="Enter Code"
                            className="w-full px-3 rounded-md text-lg"
                        />
                        {appliedDiscountAmount > 0 ? (
                            <Button
                                onClick={handleDiscountRemove}
                                variant="outline"
                                className="text-sm px-4 py-2 border-black rounded-md"
                            >
                                REMOVE
                            </Button>
                        ) : (
                            <Button
                                onClick={handleDiscountApply}
                                variant="outline"
                                className="text-sm px-4 py-2 border-black rounded-md"
                            >
                                APPLY
                            </Button>
                        )}
                    </div>
                </div>

            </div>

            {/* Right Column */}
            <Card className="h-fit border border-black rounded-xl p-6">
                <CardHeader className="p-0">
                    <CardTitle className="text-xl font-[outfit] font-black">ORDER SUMMARY</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-0">
                    {/* Product 1 */}
                    <div className="flex items-center gap-4">
                        <div className="w-65 h-65 bg-gray-100 rounded-lg overflow-hidden">
                            <Image
                                src="/images/checkout-image.png"
                                alt="CoreFlex Dress 1"
                                width={260}
                                height={260}
                                priority={true}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="flex-1 space-y-2">
                            <div>
                                <h3 className="font-medium text-base text-[#515151]">CoreFlex</h3>
                                <p className="text-xl font-bold text-black">Dress 1</p>
                                <div className="flex items-center gap-2 text-lg">
                                    <span className="font-semibold">$30.00</span>
                                    <span className="text-sm text-gray-500 line-through">$30.00</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Select defaultValue="Black" >
                                    <SelectTrigger className="border-black">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent >
                                        <SelectItem value="Black">Black</SelectItem>
                                        <SelectItem value="White">White</SelectItem>
                                        <SelectItem value="Gray">Gray</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select defaultValue="Small">
                                    <SelectTrigger className="border-black">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Small">Small</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="Large">Large</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center justify-start gap-4">
                                <div className="flex items-center gap-2 border border-black p-1.5 rounded-md">
                                    <Button variant="outline" size="sm" className="h-6 w-6 p-0 border-none">
                                        <Minus className="h-3 w-3" />
                                    </Button>
                                    <span className="w-8 text-center">2</span>
                                    <Button variant="outline" size="sm" className="h-6 w-6 p-0 border-none">
                                        <Plus className="h-3 w-3" />
                                    </Button>
                                </div>
                                <Button variant="ghost" size="sm" className="h-10 w-10 p-4 border border-black">
                                    <Trash2 className="h-3 w-3" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Order Totals */}
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span>Sub Total</span>
                            <span>$60.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Discount</span>
                            <span>${discount}.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax</span>
                            <span>$5.00</span>
                        </div>
                        <div className="flex justify-between font-semibold text-lg">
                            <span>Total</span>
                            <span>{total}</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <Button variant="outline" className="flex-1 h-12.5 rounded-none font-semibold text-lg">
                            SHOP MORE
                        </Button>
                        <Button onClick={handleCheckout} className="bg-black hover:bg-gray-800 flex-1 h-12.5 rounded-none font-semibold text-lg">
                            PLACE ORDER
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
