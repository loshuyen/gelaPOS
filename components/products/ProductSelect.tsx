"use client";

import { updateProductStatuses } from "@/actions/products";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Product } from "@/types/product";
import { useState } from "react";
import { toast } from "sonner";

interface ProductSelectProps extends React.HTMLAttributes<HTMLDivElement> {
  products: Product[];
}

export function ProductSelect({ products }: ProductSelectProps) {
  const originalActiveProducts = products.filter((p) => p.is_active);
  const originalInActiveProducts = products.filter((p) => !p.is_active);

  const [activeProducts, setActiveProducts] = useState(originalActiveProducts);
  const [inActiveProducts, setInActiveProducts] = useState(
    originalInActiveProducts
  );

  const handleCancel = () => {
    setActiveProducts(originalActiveProducts);
    setInActiveProducts(originalInActiveProducts);
  };

  const handleSave = async () => {
    const originalActiveIds = new Set(originalActiveProducts.map((p) => p.id));
    const originalInactiveIds = new Set(
      originalInActiveProducts.map((p) => p.id)
    );

    const currentActiveIds = new Set(activeProducts.map((p) => p.id));
    const currentInactiveIds = new Set(inActiveProducts.map((p) => p.id));

    const toActivate = [...currentActiveIds].filter(
      (id) => !originalActiveIds.has(id)
    );
    const toDeactivate = [...currentInactiveIds].filter(
      (id) => !originalInactiveIds.has(id)
    );

    const updates = [
      ...toActivate.map((id) => ({ id, is_active: true })),
      ...toDeactivate.map((id) => ({ id, is_active: false })),
    ];

    if (updates.length === 0) return;

    toast.promise(updateProductStatuses(updates), {
      loading: "商品更新中...",
      success: () => {
        return "商品更新完成";
      },
      error: "商品更新失敗",
    });
  };

  const handleAdd = (product: Product) => {
    if (activeProducts.find((p) => p.id === product.id)) return;

    setActiveProducts((prev) => [...prev, product]);
    setInActiveProducts((prev) => prev.filter((p) => p.id !== product.id));
  };

  const handleRemove = (product: Product) => {
    setInActiveProducts((prev) => [...prev, product]);
    setActiveProducts((prev) => prev.filter((p) => p.id !== product.id));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>編輯</Button>
      </DialogTrigger>
      <DialogDescription></DialogDescription>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>編輯架上商品</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <p className="px-2">已選商品</p>
            <ScrollArea className="max-h-[250px] rounded-md border dark:bg-cyan-950">
              <div className="px-4 divide-y">
                {activeProducts.map((product) => (
                  <div key={product.id} className="flex py-2 items-center">
                    <p className="text-lg min-w-[150px]">{product.name}</p>
                    <p className="text-lg mr-auto">{`$${product.price}`}</p>
                    <Button
                      variant={"destructive"}
                      onClick={() => handleRemove(product)}
                    >
                      移除
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div className="grid gap-3">
            <p className="px-2">商品清單</p>
            <ScrollArea className="max-h-[250px] rounded-md border dark:bg-slate-900">
              <div className="px-4 divide-y">
                {inActiveProducts.map((product) => (
                  <div key={product.id} className="flex py-2 items-center">
                    <p className="text-lg min-w-[150px]">{product.name}</p>
                    <p className="text-lg mr-auto">{`$${product.price}`}</p>
                    <Button
                      variant={"secondary"}
                      onClick={() => handleAdd(product)}
                    >
                      加入
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
        <DialogFooter className="px-4">
          <DialogClose asChild>
            <Button variant="outline" onClick={handleCancel}>
              取消
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleSave}>儲存</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
