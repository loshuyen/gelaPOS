"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CircleCheck, CircleX } from "lucide-react";
import { Product } from "@/types/product";
import Image from "next/image";
import DeleteBtn from "../buttons/DeleteBtn";
import { deleteProductById } from "@/actions/products";
import { toast } from "sonner";
import EditProductForm from "./EditProductForm";

function formatDate(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const mi = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  return `${yyyy}/${mm}/${dd} ${hh}:${mi}:${ss}`;
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "品名",
    cell: ({ row }) => {
      const name = row.getValue("name");
      return name;
    },
  },
  {
    accessorKey: "price",
    header: "單價",
    cell: ({ row }) => {
      const price = row.getValue("price");
      return `$${price}`;
    },
  },
  {
    accessorKey: "imageSrc",
    header: "圖片",
    cell: ({ row }) => {
      const imageSrc = row.getValue("imageSrc");
      return (
        <Image
          src={`${imageSrc || "./images/default.webp"}`}
          alt="product image"
          width={0}
          height={0}
          className="size-10 object-cover"
          unoptimized
        ></Image>
      );
    },
  },
  {
    accessorKey: "is_active",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center"
        >
          上架中
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const is_active = row.getValue("is_active");
      return is_active ? (
        <CircleCheck className="text-green-500" />
      ) : (
        <CircleX className="text-gray-800" />
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "建立時間",
    cell: ({ getValue }) => {
      const date = new Date(getValue() as string);
      return formatDate(date);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex align-center justify-around ml-4">
          <EditProductForm product={product} />
          <DeleteBtn
            handleDelete={async () => {
              toast.promise(deleteProductById(product.id), {
                loading: "刪除中...",
                success: () => {
                  return "刪除完成";
                },
                error: "刪除失敗",
              });
            }}
          />
        </div>
      );
    },
  },
];
