"use client";

import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import CartTotal from "./CartTotal";
import { PaySelect } from "./PaySelect";
import { CartSidebarProps } from "@/types/product";

export function CartSidebar({
  cartItems,
  handlePayMethodChange,
  discount,
  handleCheckout,
  handleClearCart,
  isPending,
  children,
}: CartSidebarProps) {
  return (
    <div className="flex-1 flex flex-col rounded-lg border-1 border-gray-400 p-4">
      <h2 className="text-2xl font-semibold p-4">目前訂單</h2>
      <div className="max-h-[400px] mb-auto overflow-y-auto divide-y-1 divide-gray-600">
        {children}
      </div>
      <PaySelect handlePayMethodChange={handlePayMethodChange} />
      <CartTotal
        subtotal={cartItems.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        )}
        discount={discount}
      />
      <div className="flex justify-center gap-4">
        <Button
          variant="secondary"
          className="min-w-[150px] text-xl"
          onClick={handleClearCart}
        >
          清空
        </Button>
        <Button
          className="min-w-[150px] text-xl"
          onClick={handleCheckout}
          disabled={isPending}
        >
          {isPending ? <Loader2Icon className="animate-spin" /> : "確認"}
        </Button>
      </div>
    </div>
  );
}
