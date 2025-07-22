
interface CartTotalProps {
  subtotal: number;
  discount: number;
}

const CartTotal = ({ subtotal, discount }: CartTotalProps) => {
  return (
    <div className="rounded-xl p-4 dark:bg-gray-900 bg-gray-100 text-xl mb-4">
      <div className="">
        <div className="flex justify-between">
          <span>小計</span>
          <span>${subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>折扣</span>
          <span>-${discount}</span>
        </div>
      </div>
      <div className="border-t mt-4 pt-3 flex justify-between font-bold">
        <span>總計</span>
        <span>${subtotal - discount}</span>
      </div>
    </div>
  )
}

export default CartTotal