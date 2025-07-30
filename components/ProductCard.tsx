import React from "react";
import Image from "next/image";
import { ProductCardProps } from "@/types/product";

const ProductCard = ({ product, children }: ProductCardProps) => {
  return (
    <div className="w-[200px] h-[250px] p-4 rounded-lg border-1 border-gray-400">
      <div className="w-full h-[150px] aspect-video rounded-lg relative">
        <Image
          src={product.imageSrc || "./images/default.webp"}
          alt={product.name}
          fill={true}
          className="rounded-lg object-cover"
          unoptimized
        />
      </div>
      <p className="my-2">{product.name}</p>
      <div className="flex items-center justify-between mt-2">
        <p>${product.price}</p>
        {children}
      </div>
    </div>
  );
};

export default ProductCard;
