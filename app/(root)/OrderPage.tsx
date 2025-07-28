"use client";

import { useState, useTransition } from "react";
import ProductCard from "@/components/ProductCard";
import { CartSidebar } from "@/components/cart/CartSidebar";
import { Product, Flavor, CartItem } from "@/types/product";
import { FlavorDialog } from "@/components/forms/FlavorDialog";
import { FlavorSelect } from "@/components/FlavorSelect";
import CartItemCard from "@/components/cart/CartItemCard";
import { createSale } from "@/actions/sales";
import { toast } from "sonner";

export default function OrderPage({
  products,
  flavors,
}: {
  products: Product[];
  flavors: Flavor[];
}) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discount] = useState(0);
  const [payMethod, setPayMethod] = useState("cash");
  const [selectedFlavors, setSelectedFlavors] = useState<Flavor[]>([]);
  const [isPending, startTransition] = useTransition();

  const areListsEqual = (a: Flavor[], b: Flavor[]) => {
    if (a.length !== b.length) return false;

    const idsA = new Set(a.map((f) => f.id));
    const idsB = new Set(b.map((f) => f.id));

    if (idsA.size !== idsB.size) return false;

    for (const id of idsA) {
      if (!idsB.has(id)) return false;
    }

    return true;
  };

  const handleFlavorAdd = (flavor: Flavor) => {
    setSelectedFlavors((prev) => {
      const exists = prev.find((f) => f.id === flavor.id);
      if (exists) return prev;
      return [...prev, flavor];
    });
  };

  const handleFlavorRemove = (flavor: Flavor) => {
    setSelectedFlavors((prev) => prev.filter((f) => f.id !== flavor.id));
  };

  const handlePayMethodChange = (value: string) => {
    setPayMethod(value);
  };

  const clearSelectedFlavors = () => {
    setSelectedFlavors([]);
  };

  const addProductToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => {
        return (
          item.product.id === product.id &&
          areListsEqual(item.flavors, selectedFlavors)
        );
      });

      if (existingIndex !== -1) {
        return prevItems.map((item, index) => {
          if (existingIndex === index) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      }

      return [
        ...prevItems,
        {
          product,
          quantity: 1,
          flavors: selectedFlavors,
        },
      ];
    });
    setSelectedFlavors([]);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    startTransition(async () => {
      try {
        toast.promise(createSale(payMethod, cartItems), {
          loading: "訂單新增中...",
          success: () => {
            return "新增訂單完成";
          },
          error: "新增失敗",
        });
        setCartItems([]);
      } catch (error) {
        console.log("新增sale失敗", error);
      }
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleQuantityAdd = (index: number) => {
    setCartItems((prevItems) => {
      return prevItems.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
  };

  const handleQuantityRemove = (index: number) => {
    setCartItems((prevItems) => {
      const currentItem = prevItems[index];

      if (currentItem.quantity === 1) {
        return prevItems.filter((_, i) => i !== index);
      }

      return prevItems.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  return (
    <div className="flex justify-between">
      <div className="w-2/3 h-[calc(100vh-56px)] flex flex-wrap justify-center gap-4 overflow-y-auto">
        {products.map((product) => (
          <ProductCard key={product.id} product={product}>
            <FlavorDialog
              product={product}
              clearSelectedFlavors={clearSelectedFlavors}
              addProductToCart={() => addProductToCart(product)}
            >
              <FlavorSelect
                flavors={flavors}
                selectedFlavors={selectedFlavors}
                handleFlavorAdd={handleFlavorAdd}
                handleFlavorRemove={handleFlavorRemove}
              />
            </FlavorDialog>
          </ProductCard>
        ))}
      </div>
      <CartSidebar
        cartItems={cartItems}
        handlePayMethodChange={handlePayMethodChange}
        discount={discount}
        handleCheckout={handleCheckout}
        handleClearCart={handleClearCart}
        isPending={isPending}
      >
        {cartItems.length === 0 ? (
          <p className="p-4 text-gray-500">無任何商品</p>
        ) : (
          cartItems.map((item, index) => (
            <CartItemCard
              key={index}
              product={item.product}
              quantity={item.quantity}
              flavors={item.flavors}
              handleQuantityAdd={() => handleQuantityAdd(index)}
              handleQuantityRemove={() => handleQuantityRemove(index)}
            />
          ))
        )}
      </CartSidebar>
    </div>
  );
}
