import { CirclePlus, CircleMinus } from "lucide-react";
import { CartItemProps } from "@/types/product";

const CartItemCard = ({
  product,
  quantity,
  flavors,
  handleQuantityAdd,
  handleQuantityRemove,
}: CartItemProps) => {
  return (
    <div className="flex items-center w-full py-2">
      <div className="flex-1 text-xl font-semibold">
        <p className="px-4">{product.name}</p>
        <p className="px-4">
          {flavors.length > 0 ? (
            flavors.map((flavor) => (
              <span key={flavor.id} className="text-lg text-gray-400 mr-2">
                {flavor.name}
              </span>
            ))
          ) : (
            <></>
          )}
        </p>
        <div className="flex items-center w-full px-4 py-2">
          <p className="mr-auto">${product.price}</p>
          <button className="w-8 h-8">
            <CircleMinus
              className="w-full h-full"
              onClick={handleQuantityRemove}
            />
          </button>
          <span className="px-4">{quantity}</span>
          <button className="w-8 h-8" onClick={handleQuantityAdd}>
            <CirclePlus className="w-full h-full" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
