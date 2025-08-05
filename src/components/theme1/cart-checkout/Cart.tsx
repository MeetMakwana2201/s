'use client';

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetDescription
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { initialItems } from "@/lib/cart-checkout/Cart";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import Link from "next/link";


export default function CartSheet() {
    const [items, setItems] = useState(initialItems);

    const increaseQty = (id: number) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQty = (id: number) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const removeItem = (id: number) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <ShoppingCart className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="md:max-w-2xl max-w-full w-full px-6 pt-6 overflow-y-scroll rounded-b-2xl rounded-t-2xl">
                <SheetHeader className="p-0">
                    <SheetTitle className="text-2xl font-black">CART</SheetTitle>
                    <SheetDescription>
                    </SheetDescription>

                </SheetHeader>

                <div className="space-y-6 mt-6">
                    {items.map((item) => (
                        <div key={item.id} className="flex flex-col md:flex-row gap-4">
                            <div className="shrink-0 md:w-[185px] md:h-[185px] rounded-md overflow-hidden">
                                <Image
                                    src={item.imageUrl}
                                    alt={item.name}
                                    width={185}
                                    height={185}
                                    className="w-full h-full object-cover rounded-lg aspect-square"
                                />
                            </div>
                            <div className="flex-1 space-y-1">
                                <p className="text-sm text-muted-foreground">{item.brand}</p>
                                <h3 className="font-semibold">{item.name}</h3>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-base">${item.price.toFixed(2)}</span>
                                    <span className="text-sm line-through text-gray-400">${item.originalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    {/* <Button variant="outline" size="sm">{item.color}</Button>
                                    <Button variant="outline" size="sm">{item.size}</Button> */}
                                    <div className="flex items-center gap-4 mt-2">
                                        <Select
                                            value={item.color}
                                            onValueChange={(value) => {
                                                setItems((prev) =>
                                                    prev.map((i) =>
                                                        i.id === item.id ? { ...i, color: value } : i
                                                    )
                                                );
                                            }}
                                        >
                                            <SelectTrigger className="w-[100px] h-8 text-sm">
                                                <SelectValue placeholder="Color" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {item.availableColors.map((color) => (
                                                    <SelectItem key={color} value={color}>
                                                        {color}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        <Select
                                            value={item.size}
                                            onValueChange={(value) => {
                                                setItems((prev) =>
                                                    prev.map((i) =>
                                                        i.id === item.id ? { ...i, size: value } : i
                                                    )
                                                );
                                            }}
                                        >
                                            <SelectTrigger className="w-[100px] h-8 text-sm">
                                                <SelectValue placeholder="Size" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {item.availableSizes.map((size) => (
                                                    <SelectItem key={size} value={size}>
                                                        {size}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    <Button variant="outline" size="sm" onClick={() => decreaseQty(item.id)}>-</Button>
                                    <span className="px-2">{item.quantity}</span>
                                    <Button variant="outline" size="sm" onClick={() => increaseQty(item.id)}>+</Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <SheetFooter className="px-0 flex flex-row gap-4 sticky bottom-0 bg-white ">
                    <SheetClose className="flex-1">
                        <div className="flex-1 w-full rounded-none border border-[#040404] px-4 py-1">
                            SHOP MORE
                        </div>
                    </SheetClose>
                    <Link href="/checkout" className="flex-1 bg-black text-white hover:bg-black/90 text-center">
                        <Button className="w-full">
                            CHECKOUT
                        </Button>
                    </Link>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
