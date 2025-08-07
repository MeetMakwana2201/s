"use client";

import {
    Menu,
    Search,
    User,
    ChevronRight,
    X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import SearchResults from "./SearchResults";
import { Categories } from "@/lib/categories/CategoriesList";
import CartSheet from "../cart-checkout/Cart";

export default function Header() {
    const [isSignIn, setIsSignIn] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false); // 🔍 toggle state
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 60);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"
                }`}
        >
            <div className="flex items-center justify-between mx-auto lg:px-12 px-3 py-2.5">
                {/* ===== Mobile Menu (Sheet) ===== */}
                <Sheet>
                    <SheetTrigger className="lg:hidden">
                        <Menu className="h-6 w-6" />
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full gap-0 bg-white">
                        <SheetHeader>
                            <SheetTitle className="font-bold text-xl">Menu</SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col gap-4 px-4">
                            <Link
                                href="/category"
                                className="flex justify-between border rounded-2xl p-4 items-center text-lg font-medium hover:text-blue-600"
                            >
                                Categories <ChevronRight className="h-4 w-4" />
                            </Link>
                            {isSignIn ? (
                                <>
                                    <Link
                                        href="#"
                                        className="flex justify-between border rounded-2xl p-4 items-center text-lg font-medium hover:text-blue-600"
                                    >
                                        Profile <ChevronRight className="h-4 w-4" />
                                    </Link>
                                    <Link
                                        href="#"
                                        className="flex justify-between border rounded-2xl p-4 items-center text-lg font-medium hover:text-blue-600"
                                    >
                                        Saved Addresses <ChevronRight className="h-4 w-4" />
                                    </Link>
                                    <Link
                                        href="#"
                                        className="flex justify-between border rounded-2xl p-4 items-center text-lg font-medium hover:text-blue-600"
                                    >
                                        Order History <ChevronRight className="h-4 w-4" />
                                    </Link>
                                    <Link
                                        href="#"
                                        className="flex justify-between border rounded-2xl p-4 items-center text-lg font-medium hover:text-blue-600"
                                    >
                                        Support Ticket <ChevronRight className="h-4 w-4" />
                                    </Link>
                                </>
                            ) : (
                                <Link
                                    href="#"
                                    className="flex justify-between border rounded-2xl p-4 items-center text-lg font-medium hover:text-blue-600"
                                >
                                    Sign in <ChevronRight className="h-4 w-4" />
                                </Link>
                            )}
                        </div>
                    </SheetContent>
                </Sheet>

                {/* ===== Logo ===== */}
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-2xl font-bold ml-12 text-[#1C2B76]">
                        <Image
                            src="/images/footer-logo.png"
                            alt="Logo"
                            width={250}
                            height={81}
                            priority={true}
                        />
                    </Link>
                </div>

                {/* ===== Icons & Actions ===== */}
                <div className="flex items-center gap-5">
                    {/* <Link
                        href="#"
                        className="text-sm font-medium text-black hover:text-[#1C2B76] lg:block hidden"
                    >
                        Categories
                    </Link> */}
                    <div className="relative group">
                        <Link href="/category" className="lg:block hidden cursor-pointer text-[16px] font-medium">Categories</Link>

                        <div className="magamanu absolute top-5 -right-20 w-[800px] xl:w-[1100px] mt-4 max-h-[50dvh] overflow-y-scroll scrollbar-track-red-200 bg-white rounded-xl shadow-xl p-6 pe-3 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-xl font-[outfit] uppercase font-bold">Browse Categories</h4>
                                <Link href="/category" className="text-sm text-[#515151] underline">
                                    View More
                                </Link>
                            </div>
                            <div className="grid grid-cols-6 gap-5">
                                {Categories.map((cat) => (
                                    <Link
                                        key={cat.name}
                                        href={`/category/${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                                        className="group  transition overflow-hidden"
                                    >
                                        <div className="w-full rounded-xl aspect-square overflow-hidden">
                                            <Image
                                                src={cat.image}
                                                alt={cat.name}
                                                width={150}
                                                height={150}
                                                className="object-cover w-full h-full transition-transform group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="text-center text-sm font-medium py-2">
                                            {cat.name}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* === Search Icon Toggle === */}
                    <button
                        aria-label="Search"
                        onClick={() => setSearchOpen(!searchOpen)}
                    >
                        {searchOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Search className="h-5 w-5" />
                        )}
                    </button>

                    <CartSheet />

                    <button aria-label="Account" className="lg:block hidden">
                        <User className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* ===== Search Input Field ===== */}
            {searchOpen && (
                <div className={`w-full bg-white pb-4 pt-25 lg:px-12.5 px-3 py-3 border-t border-gray-200 -z-10 shadow-md fixed top-0 `}>
                    <div className="p-2 flex items-center gap-2 border border-gray-300 rounded-md">
                        <Search className="h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Search Products Here..."
                            className="w-full focus:outline-none text-base"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="px-2.5 py-1.5 bg-black text-white text-base rounded-md">
                            Search
                        </button>
                    </div>
                    {searchOpen && searchTerm && (
                        <div className="mt-2 py-4 ">
                            <SearchResults searchTerm={searchTerm} />
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}
