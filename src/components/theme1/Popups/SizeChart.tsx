'use client';

import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { X } from 'lucide-react';

type SizeChartPopupProps = {
    imageUrl: string;
};

export default function SizeChartPopup({ imageUrl }: SizeChartPopupProps) {
    console.log(imageUrl);
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="text-base text-[#515151] underline">
                    Size Chart
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-[600px] p-0">
                <DialogHeader className="flex items-center justify-between px-6 pt-4 pb-2">
                    <DialogTitle className="text-xl font-bold font-[outfit]">Size Chart</DialogTitle>
                    <DialogClose asChild>
                        <button className="text-gray-400 hover:text-black transition-colors">
                            <X className="h-5 w-5" />
                        </button>
                    </DialogClose>
                </DialogHeader>
                <div className="w-full h-full">
                    <Image
                        src={imageUrl}
                        alt="Size Chart"
                        width={600}
                        height={700}
                        className="w-full h-auto rounded-b-xl"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
