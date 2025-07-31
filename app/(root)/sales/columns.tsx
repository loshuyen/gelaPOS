"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { routes } from "@/constants/routes";
import Link from "next/link";
import { deleteSaleById } from "@/actions/sales";
import DeleteBtn from "@/components/buttons/DeleteBtn";

export type Sale = {
  id: number;
  total_price: number;
  total_quantity: number;
  pay_method: string | null;
  user_name: string | null;
  created_at: Date;
};

function formatDate(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const mi = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  return `${yyyy}/${mm}/${dd} ${hh}:${mi}:${ss}`;
}

export const columns: ColumnDef<Sale>[] = [
  {
    accessorKey: "total_price",
    header: "總金額",
    cell: ({ row }) => {
      const total = row.getValue("total_price");
      return `$${total}`;
    },
  },
  {
    accessorKey: "total_quantity",
    header: "總數量",
  },
  {
    accessorKey: "pay_method",
    header: "付款方式",
  },
  {
    accessorKey: "user_name",
    header: "建立人員",
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          建立時間
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const date = new Date(getValue() as string);
      return formatDate(date);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const sale = row.original;
      return (
        <div className="flex align-center justify-around">
          <Link
            href={`${routes.SALES}/${sale.id}`}
            className="text-lg self-center"
          >
            明細
          </Link>
          <DeleteBtn
            handleDelete={async () => {
              await deleteSaleById(sale.id);
            }}
          />
        </div>
      );
    },
  },
];
