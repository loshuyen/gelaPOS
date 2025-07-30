import { getAllProducts } from "@/actions/products";
import { getAllFlavors } from "@/actions/flavors";
import ActivePage from "@/components/products/ActivePage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AllProductPage } from "@/components/products/AllProductPage";
import { columns as productColumns } from "@/components/products/columns";
import { AllFlavorPage } from "@/components/flavors/AllFlavorPage";
import { columns as flavorColumns } from "@/components/flavors/columns";

export default async function ProductPage() {
  const products = await getAllProducts();
  const flavors = await getAllFlavors();

  return (
    <div className="flex w-full flex-col gap-6 p-4">
      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">上架中</TabsTrigger>
          <TabsTrigger value="product">商品總覽</TabsTrigger>
          <TabsTrigger value="flavor">口味總覽</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <ActivePage products={products} flavors={flavors} />
        </TabsContent>
        <TabsContent value="product">
          <AllProductPage columns={productColumns} data={products} />
        </TabsContent>
        <TabsContent value="flavor">
          <AllFlavorPage columns={flavorColumns} data={flavors} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
