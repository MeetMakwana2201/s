
import OrderSuccessfully from "@/components/theme1/order-status/OrderSuccessfully";
import OrderFailed from "@/components/theme1/order-status/OrderFailed";
import { cookies } from 'next/headers';

export default async function OrderStatus() {

  type ThemeKey = 'theme1' | 'theme2' | 'theme3';
  const theme = ((await cookies()).get('theme')?.value as ThemeKey) || 'default';

  const BreadcrumbMap = {
    theme1: () => import('@/components/theme1/Breadcrumb/Breadcrumb'),
    theme2: () => import('@/components/theme2/Breadcrumb/Breadcrumb'),
    theme3: () => import('@/components/theme3/Breadcrumb/Breadcrumb'),
  };

  const Breadcrumb = (await BreadcrumbMap[theme]())?.default;

  const OrderStatus = 0;

  return (
    <>
      <Breadcrumb page={OrderStatus ? "Order Placed Successfully" : "Couldn’t Complete Your Order"} />
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">

        {OrderStatus ? (
          <OrderSuccessfully />
        ) : (
          <OrderFailed />
        )
        }
      </div >
    </>
  );
}
