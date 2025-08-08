import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function notfound() {
    return (
        <main className="flex flex-1 flex-col items-center justify-center px-4 lg:pt-30 pt-20 lg:pb-15 text-center">
            <div className="max-w-md md:max-w-2xl">
                {/* Illustration */}
                <Image
                    src="/images/page-not-found.png" // Replace with your own SVG or illustration
                    alt="404 illustration"
                    width={454}
                    height={291}
                    priority={true}
                    className="mx-auto mb-8 "
                />

                <h1 className="text-4xl md:text-3xl font-black mb-4 font-[outfit]">Oops! Page Not Found</h1>
                <p className="text-base mb-6">
                    We couldn&apos;t find that page. But your next great find might be just a click away.
                </p>

                <Button asChild className="w-full sm:w-1/2 rounded-none text-sm font-bold">
                    <Link href="/">Continue Shopping</Link>
                </Button>
            </div>
        </main>
    )
}
