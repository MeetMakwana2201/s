'use client';

import { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function Popup() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(true);
        }, 10000); // 10s

        return () => clearTimeout(timer);
    }, []);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-md p-0 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1554284126-aa88f22d8b74"
                    alt="Promo"
                    className="w-full h-auto object-cover"
                />

                <div className="p-6 text-center">
                    <h2 className="text-lg font-bold mb-2">LAST MINUTE DEALS</h2>
                    <p className="text-sm text-muted-foreground mb-4">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>

                    <DialogFooter className="flex flex-col sm:flex-row gap-2">
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => setOpen(false)}
                        >
                            NO, THANKS
                        </Button>
                        <Button
                            className="w-full"
                            onClick={() => setOpen(false)}
                        >
                            BUY NOW
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}
