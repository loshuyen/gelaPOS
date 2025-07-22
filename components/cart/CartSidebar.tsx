"use client";

import { Button } from "@/components/ui/button";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";
import { PaySelect } from "./PaySelect";

type OrderItem = {
  name: string;
  imageSrc: string;
  price: number;
  quantity: number;
};

interface CartSidebarProps {
  orderItems: OrderItem[];
  onPayMethodChange: (value: string) => void;
  discount: number;
  onCheckout: () => void;
  onClearCart: () => void;
  onProductAdd: (product: { name: string; price: number; imageSrc: string }) => void;
  onProductRemove: (name: string) => void;
}

export function CartSidebar({
  orderItems,
  onPayMethodChange,
  discount,
  onCheckout,
  onClearCart,
  onProductAdd,
  onProductRemove
}: CartSidebarProps) {
  return (
    <div className="flex-1 flex flex-col rounded-lg border-1 border-gray-400 p-4">
      <h2 className="text-2xl font-semibold p-4">目前訂單</h2>
      <div className="max-h-[400px] mb-auto overflow-y-auto">
        {orderItems.length === 0 ? (
          <p className="p-4 text-gray-500">無任何商品</p>
        ) : (
          orderItems.map((item) => (
            <CartItem
              key={item.name}
              imageSrc={item.imageSrc}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              onProductAdd={onProductAdd}
              onProductRemove={onProductRemove}
            />
          ))
        )}
      </div>
      <PaySelect onPayMethodChange={onPayMethodChange} />
      <CartTotal
        subtotal={orderItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )}
        discount={discount}
      />
      <div className="flex justify-center gap-4">
        <Button variant="secondary" className="min-w-[150px] text-xl" onClick={onClearCart}>
          清空
        </Button>
        <Button className="min-w-[150px] text-xl" onClick={onCheckout}>
          確認
        </Button>
      </div>
    </div>
  );
}
