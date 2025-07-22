import React from "react";
import Image from "next/image";
import { CirclePlus } from "lucide-react";

interface ProductCardProps {
  productName: string;
  productPrice: number;
  productImage: string;
  onAdd: () => void;
}

const ProductCard = ({ productName, productPrice, productImage, onAdd }: ProductCardProps) => {
  return (
    <div className="w-[200px] p-4 rounded-lg border-1 border-gray-400">
      <div className="w-full h-[150px] aspect-video rounded-lg relative">
        <Image
          src={productImage}
          alt={productName}
          fill={true}
          objectFit="cover"
          className="rounded-lg"
          unoptimized
        />
      </div>
      <p className="my-2">{productName}</p>
      <div className="flex items-center justify-between mt-2">
        <p>${productPrice}</p>
        <button className="size-6" onClick={onAdd}>
          <CirclePlus className="w-full h-full"/>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
