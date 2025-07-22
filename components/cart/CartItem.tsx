import Image from "next/image";
import { CirclePlus, CircleMinus } from "lucide-react";

interface CartItemProps {
  imageSrc: string;
  name: string;
  price: number;
  quantity: number;
  onProductAdd: (product: { name: string; price: number; imageSrc: string }) => void;
  onProductRemove: (name: string) => void;
}

const CartItem = ({ imageSrc, name, price, quantity, onProductAdd, onProductRemove }: CartItemProps) => {
  return (
    <div className="flex items-center w-full py-2">
      <div className="w-[70px] h-[70px] relative">
        <Image
          src={imageSrc}
          unoptimized
          alt={name}
          fill={true}
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="flex-1 text-xl font-semibold">
        <p className="px-4 py-2">{name}</p>
        <div className="flex items-center w-full px-4 py-2">
          <p className="mr-auto">${price}</p>
          <button className="w-8 h-8" onClick={() => onProductRemove(name)}>
            <CircleMinus className="w-full h-full" />
          </button>
          <span className="px-4">{quantity}</span>
          <button className="w-8 h-8" onClick={() => onProductAdd({ name, price, imageSrc })}>
            <CirclePlus className="w-full h-full" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
