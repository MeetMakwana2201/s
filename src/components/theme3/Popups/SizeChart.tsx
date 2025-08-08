'use client';

import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import Image from 'next/image';

type SizeChartPopupProps = {
    imageUrl: string;
};

export default function SizeChartPopup({ imageUrl }: SizeChartPopupProps) {
    // console.log(imageUrl);
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="text-base text-[#515151] underline">
                    Size Chart
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-[600px] h-screen lg:h-auto lg:grid flex flex-col mt-14 p-7.5">
                <DialogHeader className="text-left h-fit">
                    <DialogTitle className="text-xl font-bold font-[outfit]">Size Chart</DialogTitle>
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
