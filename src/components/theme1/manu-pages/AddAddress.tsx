"use client";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";

export default function AddAddressSheet() {
    const [sheetOpen, setSheetOpen] = useState(false);
    const [addressType, setAddressType] = useState("Home");

    const addressTypes = ["Home", "Work", "Other"];

    return (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild >
                <Button variant="outline" className="border-black">Add Address</Button>
            </SheetTrigger>
            <SheetContent side="right" className="md:max-w-2xl max-w-full w-full">
                <SheetHeader>
                    <SheetTitle className="text-xl font-bold">Add Address</SheetTitle>
                </SheetHeader>

                {/* Address Type */}
                <div className="flex gap-2 px-6">
                    {addressTypes.map((type) => (
                        <Button
                            key={type}
                            variant="outline"
                            className={`rounded-md px-4 py-1 text-sm ${addressType === type ? 'border-black' : 'border-[#515151]'}`}
                            onClick={() => setAddressType(type)}
                        >
                            {type}
                        </Button>
                    ))}
                </div>

                {/* Form Fields */}
                <form className="mt-6 px-6 space-y-4">
                    {/* Address Line 1 */}
                    <div className="space-y-1">
                        <label htmlFor="address1" className="text-sm font-medium">
                            Address Line 1
                        </label>
                        <Input id="address1" />
                    </div>

                    {/* Address Line 2 */}
                    <div className="space-y-1">
                        <label htmlFor="address2" className="text-sm font-medium">
                            Address Line 2
                        </label>
                        <Input id="address2" />
                    </div>

                    {/* Zipcode & City */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label htmlFor="zipcode" className="text-sm font-medium">
                                Zipcode
                            </label>
                            <Input id="zipcode" />
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="city" className="text-sm font-medium">
                                City
                            </label>
                            <Input id="city" />
                        </div>
                    </div>

                    {/* Country & State */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label htmlFor="country" className="text-sm font-medium">
                                Country
                            </label>
                            <Input id="country" />
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="state" className="text-sm font-medium">
                                State
                            </label>
                            <Input id="state" />
                        </div>
                    </div>

                </form>
                {/* Buttons */}
                <SheetFooter className="px-6 flex flex-row gap-4  bg-white">
                    <SheetClose className="flex-1">
                        <div className="flex-1 w-full rounded-none border border-[#040404] px-4 py-1">
                            Cancel
                        </div>
                    </SheetClose>
                    <SheetClose asChild>
                        <Link href="/checkout" className="flex-1 bg-black text-white hover:bg-black/90 text-center">
                            <Button className="w-full cursor-pointer">
                                Add Address
                            </Button>
                        </Link>
                    </SheetClose>
                </SheetFooter>

            </SheetContent>
        </Sheet>
    );
}
