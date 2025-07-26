export interface Product {
  id: number;
  name: string;
  price: number;
  imageSrc: string;
}

export interface Flavor {
  id: string;
  name: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  flavors: Flavor[] | [];
}

export interface CartSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  cartItems: CartItem[];
  handlePayMethodChange: (value: string) => void;
  discount: number;
  isPending: boolean;
  handleCheckout: () => void;
  handleClearCart: () => void;
}

export interface CartItemProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
  quantity: number;
  flavors: Flavor[] | [];
  handleQuantityAdd: () => void;
  handleQuantityRemove: () => void;
}

export interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
}

export interface FlavorDialogProps
  extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
  clearSelectedFlavors: () => void;
  addProductToCart: () => void;
}

export interface FlavorSelectProps
  extends React.HTMLAttributes<HTMLDivElement> {
  flavors: Flavor[];
  selectedFlavors: Flavor[] | [];
  handleFlavorAdd: (flavor: Flavor) => void;
  handleFlavorRemove: (flavor: Flavor) => void;
}
