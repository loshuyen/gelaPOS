"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CircleCheck, CircleX } from "lucide-react";
import { Flavor } from "@/types/product";
import { EditFlavor } from "./EditFlavor";
import DeleteBtn from "../buttons/DeleteBtn";
import { deleteFlavorById } from "@/actions/flavors";

function formatDate(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const mi = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  return `${yyyy}/${mm}/${dd} ${hh}:${mi}:${ss}`;
}

export const columns: ColumnDef<Flavor>[] = [
  {
    accessorKey: "name",
    header: "口味",
    cell: ({ row }) => {
      const name = row.getValue("name");
      return name;
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
      const flavor = row.original;
      return (
        <div className="flex align-center justify-center gap-4">
          <EditFlavor flavor={flavor} />
          <DeleteBtn
            handleDelete={async () => {
              await deleteFlavorById(flavor.id);
            }}
          />
        </div>
      );
    },
  },
];
