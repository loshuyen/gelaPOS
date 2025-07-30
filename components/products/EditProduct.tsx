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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product } from "@/types/product";
import { updateProduct } from "@/actions/products";

export function EditProduct({ product }: { product: Product }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">編輯</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>變更商品內容</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form action={updateProduct}>
          <Input type="hidden" name="id" value={product.id} />
          <div className="grid gap-4 mb-4">
            <div className="grid gap-3">
              <Label htmlFor="name">品名</Label>
              <Input id="name" name="name" defaultValue={product.name} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="price">單價</Label>
              <Input id="price" name="price" defaultValue={product.price} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="imageSrc">圖片</Label>
              <Input
                id="imageSrc"
                name="imageSrc"
                defaultValue={product.imageSrc || "./images/default.webp"}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">取消</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit">確認</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
