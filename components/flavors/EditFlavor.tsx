import { updateFlavor } from "@/actions/flavors";
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
import { Flavor } from "@/types/product";

export function EditFlavor({ flavor }: { flavor: Flavor }) {
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
        <form action={updateFlavor}>
          <Input type="hidden" name="id" value={flavor.id} />
          <div className="grid gap-4 mb-4">
            <div className="grid gap-3">
              <Label htmlFor="name">口味</Label>
              <Input id="name" name="name" defaultValue={flavor.name} />
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
