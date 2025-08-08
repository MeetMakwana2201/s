'use client'

import { orderHistoryData } from '@/lib/manu-pages/orderHistory'
import Image from 'next/image'
import ReasonForReturn from '@/components/theme1/manu-pages/ReasonForReturn'

export default function OrderHistory() {
  return (
    <div className="lg:px-6 px-2 py-4 w-full">
      <h2 className="text-2xl font-bold mb-6">ORDER HISTORY</h2>
      <div className="space-y-6 p-6 border rounded-xl w-full">
        {orderHistoryData.map((order, index) => (
          <div key={index}>
            <div className="flex gap-2 justify-between items-center">
              <span className="text-sm lg:text-lg text-gray-500">
                <strong>Order ID :</strong> #{order.orderId}
              </span>


              <span className={`text-white px-4 py-2.5 rounded-md text-xs lg:text-base ${order.product.returned ? "bg-[#191919]" : 'bg-green-600'}`}>
                {order.status.toUpperCase()}
              </span>
            </div>

            <div className="flex justify-between lg:items-end items-start flex-col lg:flex-row">
              <div className="flex md:items-center flex-col md:flex-row gap-4 mt-2 md:w-fit w-full">
                <div className=" w-full h-auto md:size-65 mb-4">
                  <Image
                    src={order.product.imageUrl}
                    alt={order.product.name}
                    width={145}
                    height={145}
                    className="rounded-[20px] w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-base text-gray-500">{order.product.brand}</p>
                  <h3 className="font-semibold text-xl">{order.product.name}</h3>
                  <p className="text-black font-bold text-lg">${order.product.price.toFixed(2)}</p>
                  <p className="text-base text-gray-500">
                    {order.product.deliveredAt}
                  </p>
                </div>
              </div>
              <div className='mt-4 lg:mt-0 w-full lg:w-auto'>
                <ReasonForReturn />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
