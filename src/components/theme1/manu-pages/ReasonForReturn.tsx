"use client";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
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

    return (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild >
                <Button variant="outline" className="border-black uppercase rounded-none w-full">Return product</Button>
            </SheetTrigger>
            <SheetContent side="right" className="md:max-w-2xl max-w-full w-full">
                <SheetHeader>
                    <SheetTitle className="text-xl font-bold uppercase">reason for return</SheetTitle>
                    <SheetDescription className="text-lg">
                        We’re accepting the return as the product didn’t meet your expectations or had an issue. We apologize for the inconvenience and are happy to assist with the return process
                    </SheetDescription>
                </SheetHeader>

                <div className="px-4">
                    <label className="block text-base font-medium mb-2.5">Return Reason</label>
                    <input className="w-full border border-[#515151] px-4 py-2 rounded-md" type="text" />
                </div>


                {/* Buttons */}
                <SheetFooter className="px-6 flex flex-row gap-4  bg-white">
                    <SheetClose className="flex-1">
                        <div className="flex-1 w-full rounded-none border border-[#040404] px-4 py-1">
                            Cancel
                        </div>
                    </SheetClose>
                    <SheetClose asChild>
                        <div className="flex-1 bg-black text-white hover:bg-black/90 text-center">
                            <Button className="w-full cursor-pointer">
                                Return product
                            </Button>
                        </div>
                    </SheetClose>
                </SheetFooter>

            </SheetContent>
        </Sheet>
    );
}
