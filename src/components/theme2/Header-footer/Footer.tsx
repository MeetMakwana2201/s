'use client';

// import { FaInstagram, FaPinterest, FaXTwitter, FaFacebookF } from 'react-icons/fa6';
import Image from 'next/image';
import Link from 'next/link';
import { footerData } from '@/lib/Header-Footer/Footer';

export default function Footer() {
    return (
        <footer className="bg-white text-black py-4 px-6 md:px-12">
            <div className='flex justify-between flex-wrap mb-6'>
                <Image
                    src={`/images/${footerData.logo}`}
                    alt={footerData.brandName}
                    width={251} height={81}
                />
                <div className='flex items-center md:justify-center flex-wrap gap-2.5'>
                    <p className="text-base font-medium mb-0 ">Download Our Apps From</p>
                    <div className="flex gap-2">
                        <Image src="/images/playstore.png" className='rounded-lg hover:opacity-80' alt="Play Store" width={40} height={40} />
                        <Image src="/images/appstore.png" className='rounded-lg hover:opacity-80' alt="App Store" width={40} height={40} />
                    </div>
                </div>
            </div>
            <nav className="flex flex-wrap gap-4 text-sm font-medium">
                {footerData.navLinks.map((link) => (
                    <Link key={link.label} href={link.href} className="hover:underline text-base">
                        {link.label}
                    </Link>
                ))}
            </nav>
            <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-end mt-6">
                <div className="space-y-4">
                    <span>Follow us on</span>
                    <div className="flex gap-3 mt-2">
                        {footerData.socialLinks.map((social) => (
                            <Link key={social.label} href={social.href} aria-label={social.label}>
                                <Image
                                    src={`/images/${social.image}`}
                                    alt={social.label}
                                    width={40}
                                    height={40}
                                    className="rounded-lg hover:opacity-80"
                                />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* CENTER: Copyright */}
                <div className="md:text-center text-sm order-3 md:order-2">
                    <span>copyright ©{footerData.copyrightText}</span>
                </div>

                {/* RIGHT: App links + Powered By */}
                <div className="flex flex-col md:items-end justify-between h-full space-y-4 order-2 md:order-3">
                    <div className="md:text-center text-xs text-gray-600">
                        <p>Powered By</p>
                        <Image
                            src="/images/footer-united-super-app-logo.png"
                            alt="United Super App"
                            width={132}
                            height={41}
                            className="mt-2"
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
}
