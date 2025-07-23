"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/constants/products";
import { CartSidebar } from "@/components/cart/CartSidebar";

interface OrderItem {
    name: string;
    price: number
    quantity: number
    imageSrc: string;
}

export default function Home() {
  const [orderItems, setOrderItems] = useState([] as OrderItem[]);
  const [discount] = useState(0);
  const [payMethod, setPayMethod] = useState("cash");
  
  const handlePayMethodChange = (value: string) => {
    setPayMethod(value);
  };

  const handleCheckout = () => {
    if (orderItems.length === 0) return;
    console.log(orderItems, payMethod);
  };

  const handleClearCart = () => {
    setOrderItems([]);
  };

  const handleProductAdd = (product: { name: string; price: number; imageSrc: string }) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find(item => item.name === product.name);
      if (existingItem) {
        return prevItems.map(item =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const handleProductRemove = (productName: string) => {
    setOrderItems((prevItems) =>
      prevItems.map((item) =>
        item.name === productName
          ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  return (
    <div className="flex justify-between">
      <div className="w-2/3 h-[calc(100vh-56px)] flex flex-wrap justify-center gap-4 overflow-y-auto">
        {products.map((product) => (
          <ProductCard
            key={product.name}
            productName={product.name}
            productPrice={product.price}
            productImage={product.imageSrc}
            onAdd={() => handleProductAdd(product)}
          />
        ))}
      </div>
      <CartSidebar orderItems={orderItems} onPayMethodChange={handlePayMethodChange} discount={discount} onCheckout={handleCheckout} onClearCart={handleClearCart} onProductAdd={handleProductAdd} onProductRemove={handleProductRemove}/>
    </div>
  );
}
