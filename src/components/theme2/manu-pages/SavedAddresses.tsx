"use client";

import AddAddress from "@/components/theme1/manu-pages/AddAddress";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function SavedAddressesPage() {
    // Placeholder: replace with real data from API or state
    const addresses = [
        {
            id: 1,
            label: "Home",
            address: "1234 Elm Street, Apartment 5B, Greenview Heights\nLos Angeles, California 90001, USA",
        },
        {
            id: 2,
            label: "Home",
            address: "1234 Elm Street, Apartment 5B, Greenview Heights\nLos Angeles, California 90001, USA",
        },
    ];

    const handleDelete = (id: number) => {
        // TODO: API call or state update
        console.log("Delete address:", id);
    };

    return (
        <div className="lg:px-6 w-full max-w-xl">
            <h1 className="text-4xl font-bold mb-6">Saved Address</h1>

            <div className="space-y-4">
                {addresses.map((item) => (
                    <div
                        key={item.id}
                        className="flex justify-between items-center border border-[#515151] rounded-md p-4"
                    >
                        <div>
                            <h2 className="text-lg font-[outfit] font-semibold">{item.label}</h2>
                            <p className="whitespace-pre-line text-sm">
                                {item.address}
                            </p>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="border border-[#515151]"
                            onClick={() => handleDelete(item.id)}
                        >
                            <Trash2 className="w-5 h-5" />
                        </Button>
                    </div>
                ))}
            </div>

            <AddAddress manupages={true} />
        </div>
    );
}
