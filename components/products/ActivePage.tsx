import { ActiveProduct } from "./ActiveProduct";
import { ActiveFlavor } from "./ActiveFlavor";
import { ProductSelect } from "./ProductSelect";
import { FlavorSelect } from "./FlavorSelect";
import { Flavor, Product } from "@/types/product";

export default async function ActivePage({
  products,
  flavors,
}: {
  products: Product[];
  flavors: Flavor[];
}) {
  return (
    <div className="flex gap-4">
      <section className="flex-1/2">
        <div className="flex px-2 mb-2 items-center gap-4">
          <h2 className="text-2xl font-semibold">架上商品</h2>
          <ProductSelect products={products} />
        </div>
        <div className="max-h-[500px] overflow-y-auto rounded-lg border-1 border-gray-400">
          <ActiveProduct products={products.filter((p) => p.is_active)} />
        </div>
      </section>

      <section className="flex-1/2">
        <div className="flex px-2 mb-2 items-center gap-4">
          <h2 className="text-2xl font-semibold">架上口味</h2>
          <FlavorSelect flavors={flavors} />
        </div>
        <div className="max-h-[500px] overflow-y-auto rounded-lg border-1 border-gray-400">
          <ActiveFlavor flavors={flavors.filter((f) => f.is_active)} />
        </div>
      </section>
    </div>
  );
}
