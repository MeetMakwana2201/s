"use client";

import Image from 'next/image';
// import { cookies } from 'next/headers';
import { Button } from '@/components/ui/button';
import { getProductBySlug } from '@/lib/Products/ProductDetails';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
// import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
// import { SizeChartPopup } from '@/components/popups/SizeChart';
import dynamic from 'next/dynamic';
import Cookies from 'js-cookie'

export interface Product {
  slug: string;
  name: string;
  brand?: string | null;
  category: string;
  price: number;
  originalPrice: number;
  discount: string;
  images: string[];
  colors: {
    name: string;
    code: string;
    selected: boolean;
  }[];
  sizes?: string[];
  returnEligible: boolean;
  ProductAvailability: number;
  SizeChartImage: string;
  description: string;
}
interface BreadcrumbProps {
  category: string;
  productName: string;
}

interface SizeChartPopupProps {
  imageUrl: string;
}

export default function ProductDetailPage() {
  const params = useParams<{ slug: string; }>(); // Get the URL parameters using useParams hook
  const slug = params.slug;

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [thumbnailImages, setThumbnailImages] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const theme = Cookies.get('theme') || 'default';



  const Breadcrumb = dynamic<BreadcrumbProps>(() =>
    import(`@/components/${theme}/Breadcrumb/Breadcrumb`)
  );
  const sizeChartMap: Record<string, () => Promise<{ default: React.ComponentType<SizeChartPopupProps> }>> = {
    theme1: () => import('@/components/theme1/Popups/SizeChart'),
    theme2: () => import('@/components/theme2/Popups/SizeChart'),
    theme3: () => import('@/components/theme3/Popups/SizeChart'),
  };

  const SizeChartPopup = dynamic<SizeChartPopupProps>(sizeChartMap[theme] ?? sizeChartMap['theme1']);


  useEffect(() => {
    const fetchData = async () => {
      const prod = await getProductBySlug(slug);
      setProduct(prod);
      if (prod) {
        setSelectedImage(prod.images[0]);  // First image is big
        setThumbnailImages(prod.images.slice(1, 5)); // Next 4 as thumbnails
      }
    };
    fetchData();
  }, [slug]);

  {/* Function to handle thumbnail image click */ }
  const handleThumbnailClick = (clickedImg: string, index: number) => {
    // Swap clicked thumbnail with big image
    const newThumbnails = [...thumbnailImages];
    if (selectedImage !== null) {
      newThumbnails[index] = selectedImage;
    }
    setSelectedImage(clickedImg);
    setThumbnailImages(newThumbnails);
  };

  {/* Function to handle color change */ }
  useEffect(() => {
    if (product?.colors?.length) {
      // Preselect the first color
      setSelectedColor(product.colors[0].name);
    }
  }, [product]);

  const handleColorClick = (colorName: string) => {
    {/* Function to handle color change */ }
    setSelectedColor(colorName);
  };

  {/* Function to handle size change */ }
  useEffect(() => {
    if (product?.sizes?.length) {
      setSelectedSize(product.sizes[0]); // Preselect first size (optional)
    }
  }, [product]);

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };

  if (!product || !selectedImage) {
    return <p className="text-center text-muted-foreground">Loading product...</p>;
  }

  return (
    <div className="px-4 xl:px-12 mx-auto pt-24 ">

      <Breadcrumb category={product.category} productName={product.name} />

      <main className="grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT IMAGE BLOCK */}
        <div>
          {/* Main Image */}
          <div className="relative w-full aspect-square mb-4">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              className="rounded-[20px] object-cover"
            />
            {product.discount && (
              <span className="absolute top-0 right-0 bg-black text-white text-lg px-6 py-4 rounded-tr-[20px] rounded-bl-[20px]">
                {product.discount}
              </span>
            )}
          </div>

          {/* Thumbnail Grid */}
          <div className="grid grid-cols-4 gap-2 max-w-md">
            {thumbnailImages.map((img: string, i: number) => (
              <button
                key={i}
                onClick={() => handleThumbnailClick(img, i)}
                className={`w-full aspect-square border rounded overflow-hidden ${selectedImage === img ? 'ring-2 ring-black' : ''
                  }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  width={100}
                  height={100}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT DETAILS BLOCK */}
        <div className="space-y-9">

          <div>
            <p className="uppercase text-lg text-gray-500">{product.brand || product.category}</p>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-black">${product.price}</span>
              {product.originalPrice && (
                <span className="text-gray-400 text-xl line-through">${product.originalPrice}</span>
              )}
            </div>
          </div>


          {/* COLORS */}
          <div>
            <p className="font-extrabold mb-2 text-xl font-[outfit]">Colors</p>
            <div className="flex gap-4 mt-4">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => handleColorClick(color.name)}
                  className={`flex gap-2 rounded-[10px] items-center p-2.5 ring hover:cursor-pointer transition-all duration-200 ${selectedColor === color.name ? 'ring-black' : 'ring-[#515151]'
                    }`}
                >
                  <div
                    className="size-8 rounded-md border border-gray-300"
                    style={{ backgroundColor: color.code }}
                  ></div>
                  <span className="text-base">{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* SIZES */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <div className="flex items-end gap-2 mb-4">
                <p className="font-extrabold mb-0 text-xl font-[outfit]">Sizes</p>
                {/* <Link href="#" className="text-base text-[#515151] underline">
                  Size Chart
                </Link> */}
                <SizeChartPopup imageUrl={product.SizeChartImage} />
              </div>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeClick(size)}
                    className={`border px-4 py-4 rounded-[10px] text-base hover:cursor-pointer transition-all duration-200 ${selectedSize === size
                      ? 'border-black  text-black'
                      : 'border-[#515151]  text-[#515151]'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}


          {product.returnEligible && (
            <p className="flex items-center gap-2 text-base">
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.30775 22C4.80258 22 4.375 21.825 4.025 21.475C3.675 21.125 3.5 20.6974 3.5 20.1923V6.80777C3.5 6.3026 3.675 5.87502 4.025 5.52502C4.375 5.17502 4.80258 5.00002 5.30775 5.00002H6.69225V3.65377C6.69225 3.43593 6.76617 3.25326 6.914 3.10576C7.06167 2.95843 7.24467 2.88477 7.463 2.88477C7.68133 2.88477 7.86383 2.95843 8.0105 3.10576C8.15733 3.25326 8.23075 3.43593 8.23075 3.65377V5.00002H15.8078V3.63477C15.8078 3.42227 15.8797 3.2441 16.0235 3.10027C16.1672 2.9566 16.3453 2.88477 16.558 2.88477C16.7707 2.88477 16.9488 2.9566 17.0923 3.10027C17.2359 3.2441 17.3078 3.42227 17.3078 3.63477V5.00002H18.6923C19.1974 5.00002 19.625 5.17502 19.975 5.52502C20.325 5.87502 20.5 6.3026 20.5 6.80777V11.5213C20.5 11.7338 20.4281 11.9118 20.2843 12.0555C20.1404 12.1993 19.9623 12.2713 19.7498 12.2713C19.5371 12.2713 19.359 12.1993 19.2155 12.0555C19.0718 11.9118 19 11.7338 19 11.5213V10.8078H5V20.1923C5 20.2693 5.03208 20.3398 5.09625 20.4038C5.16025 20.4679 5.23075 20.5 5.30775 20.5H11.425C11.6375 20.5 11.8157 20.5719 11.9595 20.7158C12.1032 20.8596 12.175 21.0378 12.175 21.2503C12.175 21.4629 12.1032 21.641 11.9595 21.7845C11.8157 21.9282 11.6375 22 11.425 22H5.30775ZM18.1923 23C16.9436 23 15.8814 22.5622 15.0058 21.6865C14.1301 20.8108 13.6923 19.7487 13.6923 18.5C13.6923 17.2513 14.1301 16.1892 15.0058 15.3135C15.8814 14.4378 16.9436 14 18.1923 14C19.4411 14 20.5033 14.4378 21.3788 15.3135C22.2544 16.1892 22.6923 17.2513 22.6923 18.5C22.6923 19.7487 22.2544 20.8108 21.3788 21.6865C20.5033 22.5622 19.4411 23 18.1923 23ZM18.6348 18.3173V16C18.6348 15.882 18.5905 15.7788 18.502 15.6905C18.4135 15.602 18.3103 15.5578 18.1923 15.5578C18.0744 15.5578 17.9713 15.602 17.8828 15.6905C17.7943 15.7788 17.75 15.882 17.75 16V18.3038C17.75 18.4216 17.7718 18.5357 17.8155 18.646C17.859 18.7563 17.9276 18.8583 18.0213 18.952L19.5463 20.477C19.6334 20.5642 19.7357 20.6093 19.853 20.6125C19.9702 20.6157 20.0756 20.5705 20.1693 20.477C20.2629 20.3833 20.3098 20.2795 20.3098 20.1655C20.3098 20.0513 20.2629 19.9474 20.1693 19.8538L18.6348 18.3173Z" fill="#515151" />
              </svg>
              <span className='uppercase '>Eligible for return</span>
            </p>
          )}

          {product.ProductAvailability === 0 && (
            <p className="flex items-center gap-2 text-base">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 14.7308C10.2288 14.7308 10.4207 14.6533 10.5755 14.4985C10.7303 14.3437 10.8077 14.1518 10.8077 13.923C10.8077 13.6942 10.7303 13.5023 10.5755 13.3475C10.4207 13.1928 10.2288 13.1155 10 13.1155C9.77117 13.1155 9.57933 13.1928 9.4245 13.3475C9.26967 13.5023 9.19225 13.6942 9.19225 13.923C9.19225 14.1518 9.26967 14.3437 9.4245 14.4985C9.57933 14.6533 9.77117 14.7308 10 14.7308ZM10.0003 11.077C10.2129 11.077 10.391 11.0051 10.5345 10.8613C10.6782 10.7176 10.75 10.5395 10.75 10.327V5.827C10.75 5.6145 10.6781 5.43633 10.5343 5.2925C10.3904 5.14883 10.2122 5.077 9.99975 5.077C9.78708 5.077 9.609 5.14883 9.4655 5.2925C9.32183 5.43633 9.25 5.6145 9.25 5.827V10.327C9.25 10.5395 9.32192 10.7176 9.46575 10.8613C9.60958 11.0051 9.78775 11.077 10.0003 11.077ZM10.0017 19.5C8.68775 19.5 7.45267 19.2507 6.2965 18.752C5.14033 18.2533 4.13467 17.5766 3.2795 16.7218C2.42433 15.8669 1.74725 14.8617 1.24825 13.706C0.749417 12.5503 0.5 11.3156 0.5 10.0017C0.5 8.68775 0.749333 7.45267 1.248 6.2965C1.74667 5.14033 2.42342 4.13467 3.27825 3.2795C4.13308 2.42433 5.13833 1.74725 6.294 1.24825C7.44967 0.749417 8.68442 0.5 9.99825 0.5C11.3123 0.5 12.5473 0.749333 13.7035 1.248C14.8597 1.74667 15.8653 2.42342 16.7205 3.27825C17.5757 4.13308 18.2528 5.13833 18.7518 6.294C19.2506 7.44967 19.5 8.68442 19.5 9.99825C19.5 11.3123 19.2507 12.5473 18.752 13.7035C18.2533 14.8597 17.5766 15.8653 16.7218 16.7205C15.8669 17.5757 14.8617 18.2528 13.706 18.7518C12.5503 19.2506 11.3156 19.5 10.0017 19.5Z" fill="#515151" />
              </svg>

              <span className='uppercase '>product is unavailable right now</span>
            </p>
          )}

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 mt-4">
            <Button className='flex-1 py-4 font-[outfit] font-bold text-sm 2xl:text-base' variant="outline" disabled={product.ProductAvailability === 0}>
              Add to Cart
            </Button>
            <Button className='flex-1 py-4 font-[outfit] font-bold text-sm 2xl:text-base' variant="default" disabled={product.ProductAvailability === 0}>
              Buy Now
            </Button>
          </div>

          { /* add for look like center */}
          <div className='h-25'>

          </div>
        </div>
      </main>
      <div className="mt-20">
        <h2 className="text-2xl lg:text-4xl font-[outfit] font-bold mb-6 uppercase">Product Description</h2>
        <p>
          {product.description}
        </p>
      </div>
    </div>
  );
}
