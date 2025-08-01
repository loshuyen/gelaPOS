"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";

const formSchema = z.object({
  name: z.string().min(1, { message: "請輸入名稱" }).max(50),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "請輸入大於 0 的數字",
  }),
  image: z.instanceof(File).optional(),
  isActive: z.boolean(),
});

export default function EditProductForm({ product }: { product: Product }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product.name,
      price: product.price.toString(),
      image: undefined,
      isActive: product.is_active,
    },
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setOpen(false);
    const imageSrc = await uploadImage();
    toast.promise(
      updateProduct({
        id: product.id,
        name: values.name,
        price: Number(values.price),
        is_active: values.isActive,
        imageSrc,
      }),
      {
        loading: "資料更新中...",
        success: () => {
          router.refresh();
          return "更新完成";
        },
        error: "更新失敗",
      }
    );
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
      fileType: "image/webp",
    };

    if (!file) return;
    const compressedFile = await imageCompression(file, options);
    setImageFile(compressedFile);
  }

  async function uploadImage() {
    if (!imageFile) return null;

    const supabase = await createClient();
    const imagePath = product.imageSrc?.split("/").pop();
    if (imagePath) {
      await supabase.storage.from("products").remove([imagePath]);
    }
    const { data } = await supabase.storage
      .from("products")
      .upload(`${uuidv4()}.webp`, imageFile, {
        upsert: true,
      });
    if (!data) return null;
    const { data: imageData } = await supabase.storage
      .from("products")
      .getPublicUrl(data.path);

    return imageData.publicUrl;
  }

  async function updateProduct(product: {
    id: number;
    name: string;
    price: number;
    imageSrc: string | null;
    is_active: boolean;
  }) {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    const user = data.user;
    if (!user) {
      throw new Error("使用者未登入");
    }

    const { data: userProfile } = await supabase
      .from("profiles")
      .select("company_id")
      .eq("id", user.id)
      .single();
    if (!userProfile?.company_id) throw new Error("未授權的使用者");

    const { data: productInfo } = await supabase
      .from("products")
      .select()
      .eq("id", product.id)
      .eq("company_id", userProfile.company_id)
      .single();

    if (!productInfo) {
      throw new Error("未授權的使用者");
    }

    const { id, ...dataToUpdate } = product;
    await supabase
      .from("products")
      .update([dataToUpdate])
      .eq("id", id)
      .eq("company_id", productInfo.company_id);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>編輯</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>更新商品</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>品名</FormLabel>
                  <FormControl>
                    <Input placeholder="輸入文字..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>售價</FormLabel>
                  <FormControl>
                    <Input placeholder="輸入數字..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>商品圖片</FormLabel>
                  <FormControl>
                    <Input type="file" onChange={handleFileChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>上架中</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">取消</Button>
              </DialogClose>
              <Button type="submit">確認</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
