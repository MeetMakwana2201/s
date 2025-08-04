'use client';

import Link from 'next/link';

type BreadcrumbProps = {
    category?: string;
    productName?: string;
    page?: string;
};

export default function Breadcrumb({ category, productName, page }: BreadcrumbProps) {
    return (
        <nav aria-label="breadcrumb" className="mb-4 lg:mt-25 mt-18 lg:px-12.5 px-3 text-lg text-muted-foreground">
            <ol className="flex items-center space-x-1">
                {/* Home */}
                <li>
                    <Link href="/" className="hover:underline">Home</Link>
                </li>

                {/* Category */}
                {category && (
                    <>
                        <Arrow />
                        <li>
                            <Link href={`/category/${category}`} className="hover:underline capitalize">
                                {category}
                            </Link>
                        </li>
                    </>
                )}

                {/* Product Name */}
                {productName && (
                    <>
                        <Arrow />
                        <li className="text-primary font-medium capitalize">{productName}</li>
                    </>
                )}

                {/* Page */}
                {page && (
                    <>
                        <Arrow />
                        <li className="capitalize text-primary">{page}</li>
                    </>
                )}
            </ol>
        </nav>
    );
}

// SVG arrow as a separate component to keep things clean
function Arrow() {
    return (
        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.7886 10.2868L7.39418 6.89263C7.2789 6.77721 7.21987 6.63214 7.21709 6.45742C7.21445 6.28284 7.27348 6.13513 7.39418 6.01429C7.51501 5.8936 7.6614 5.83325 7.83334 5.83325C8.00529 5.83325 8.15168 5.8936 8.27251 6.01429L12.0177 9.7595C12.0956 9.83756 12.1506 9.91985 12.1827 10.0064C12.2148 10.0929 12.2308 10.1864 12.2308 10.2868C12.2308 10.3872 12.2148 10.4807 12.1827 10.5672C12.1506 10.6537 12.0956 10.736 12.0177 10.8141L8.27251 14.5593C8.15709 14.6746 8.01202 14.7336 7.8373 14.7364C7.66272 14.739 7.51501 14.68 7.39418 14.5593C7.27348 14.4385 7.21313 14.2921 7.21313 14.1201C7.21313 13.9482 7.27348 13.8018 7.39418 13.681L10.7886 10.2868Z" fill="#040404" />
        </svg>
    );
}
