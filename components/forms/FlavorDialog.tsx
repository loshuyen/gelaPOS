import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import { FlavorDialogProps } from "@/types/product";
import { useState } from "react";

export function FlavorDialog({
  product,
  clearSelectedFlavors,
  addProductToCart,
  children,
}: FlavorDialogProps) {
  const [open, setOpen] = useState(false);

  const toggleDialogOpen = () => {
    setOpen(!open);
    clearSelectedFlavors();
  };

  return (
    <Dialog open={open} onOpenChange={toggleDialogOpen}>
      <DialogTrigger asChild>
        <button className="size-6">
          <CirclePlus className="w-full h-full" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{`${product.name} $${product.price}`}</DialogTitle>
          <DialogDescription>選擇口味和其他選項</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <Button variant="outline" onClick={toggleDialogOpen}>
            取消
          </Button>
          <Button
            onClick={() => {
              addProductToCart();
              toggleDialogOpen();
            }}
          >
            確認
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
