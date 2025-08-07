
import OrderSuccessfully from "@/components/theme1/order-status/OrderSuccessfully";

interface OrderStatusProps {
  success: boolean;
}

export default function OrderStatus() {

  const OrderStatus = 1;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      {OrderStatus ? (
        <OrderSuccessfully />
      ) : (
        <>

        </>
      )
      }
    </div >
  );
}
