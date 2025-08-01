// components/Header.tsx
"use client";

import { Menu, Search, User, ShoppingCart, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
// import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export default function Header() {
    // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSignIn, setIsSignIn] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-90 lg:px-12 px-3 transition-all duration-200 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
                }`}
        >
            <div className="flex items-center justify-between mx-auto">
                <Sheet>
                    <SheetTrigger className="lg:hidden">
                        <Menu className="h-6 w-6" />
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full gap-0 bg-white">
                        <SheetHeader>
                            <SheetTitle className="font-bold text-xl">Menu</SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col gap-4 px-4 ">
                            <Link
                                href="#"
                                className="flex justify-between border rounded-2xl p-4 items-center text-lg font-medium hover:text-blue-600"
                            >
                                Categories <ChevronRight className="h-4 w-4" />
                            </Link>
                            {isSignIn ?
                                <>
                                    <Link
                                        href="#"
                                        className="flex justify-between border rounded-2xl p-4 items-center text-lg font-medium hover:text-blue-600"
                                    >
                                        Account <ChevronRight className="h-4 w-4" />
                                    </Link>
                                    <Link
                                        href="#"
                                        className="flex justify-between border rounded-2xl p-4 items-center text-lg font-medium hover:text-blue-600"
                                    >
                                        Orders <ChevronRight className="h-4 w-4" />
                                    </Link>
                                    <Link
                                        href="#"
                                        className="flex justify-between border rounded-2xl p-4 items-center text-lg font-medium hover:text-blue-600"
                                    >
                                        Cart <ChevronRight className="h-4 w-4" />
                                    </Link>
                                </>
                                :
                                <>
                                    <Link
                                        href="#"
                                        className="flex justify-between border rounded-2xl p-4 items-center text-lg font-medium hover:text-blue-600"
                                    >
                                        Sign in <ChevronRight className="h-4 w-4" />
                                    </Link>
                                </>

                            }


                        </div>
                    </SheetContent>
                </Sheet>
                <div className="flex items-center gap-4">
                    {/* Mobile menu icon */}

                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold ml-12 text-[#1C2B76]">
                        <Image src="/images/footer-logo.png" alt="Logo" width={251} height={80} />
                    </Link>
                </div>

                {/* Right icons */}
                <div className="flex items-center gap-5">
                    <Link
                        href="#"
                        className="text-sm font-medium text-black hover:text-[#1C2B76] lg:block hidden"
                    >
                        Categories
                    </Link>

                    <button aria-label="Search">
                        <Search className="h-5 w-5" />
                    </button>
                    <button aria-label="Cart">
                        <ShoppingCart className="h-5 w-5" />
                    </button>
                    <button aria-label="Account" className="lg:block hidden">
                        <User className="h-5 w-5 " />
                    </button>
                </div>
            </div>
        </header>
    );
}
