'use client';

import { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogDescription,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Sheet, SheetContent, SheetTitle, SheetFooter, SheetDescription } from '@/components/ui/sheet';

export default function Popup() {
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Show popup after 30 seconds
        const timer = setTimeout(() => {
            setOpen(true);
        }, 30000);  //30s

        // Detect mobile size
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 640); //mobile check
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    const title = (
        <>
            LAST MINUTE DEALS
        </>
    )

    const button = (
        <>
            <Button
                variant="outline"
                className="flex-1 rounded-none border-[#040404] font-bold"
                onClick={() => setOpen(false)}
            >
                NO, THANKS
            </Button>
            <Button
                className="flex-1 rounded-none font-bold"
                onClick={() => setOpen(false)}
            >
                BUY NOW
            </Button>
        </>
    )

    const Content = (
        <>
            {isMobile ? (
                <div className='p-5'>
                    <SheetTitle className="text-2xl font-black mb-4 uppercase">{title}</SheetTitle>
                    <Image
                        src="/images/offer-pop-up-image.png"
                        alt="Promo"
                        width={300}
                        height={600}
                        className="w-full h-auto min-h-80  object-cover rounded-2xl"
                    />
                    <div className='py-5 text-center'>
                        <SheetTitle className="text-2xl font-black mb-4 uppercase">{title}</SheetTitle>
                        <SheetDescription className="text-base text-black mb-4">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </SheetDescription>
                    </div>

                </div>
            ) : (
                <>
                    <Image
                        src="/images/offer-pop-up-image.png"
                        alt="Promo"
                        width={800}
                        height={600}
                        className="w-full h-auto object-cover"
                    />
                    <div className='p-5 text-center'>
                        <DialogTitle className="text-4xl font-black mb-4 uppercase">{title}</DialogTitle>
                        <DialogDescription className="text-base text-black mb-4">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </DialogDescription>
                        <DialogFooter className="flex flex-col sm:flex-row gap-2 w-full">
                            {button}
                        </DialogFooter>
                    </div>
                </>
            )}
        </>
    )

    if (isMobile) {
        return (
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="bottom" className="p-0 h-full overflow-y-auto">
                    {Content}
                    <SheetFooter className="flex flex-col sm:flex-row gap-2 w-full">
                        {button}
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-md p-0 overflow-hidden border-none">
                {Content}
            </DialogContent>
        </Dialog>
    );
}
