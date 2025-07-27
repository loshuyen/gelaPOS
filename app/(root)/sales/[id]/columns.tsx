"use client";

import { ColumnDef } from "@tanstack/react-table";

export type SaleDetail = {
  saleId: number;
  name: string;
  price: number | null;
  quantity: number | null;
  flavors: string[];
};

export const columns: ColumnDef<SaleDetail>[] = [
  {
    accessorKey: "name",
    header: "品名",
  },
  {
    accessorKey: "price",
    header: "單價",
    cell: ({ row }) => {
      const total = row.getValue("price");
      return `$${total}`;
    },
  },
  {
    accessorKey: "quantity",
    header: "數量",
  },
  {
    accessorKey: "flavors",
    header: "口味",
    cell: ({ row }) => {
      const flavors: string[] = row.getValue("flavors");
      return flavors.join(", ");
    },
  },
];
