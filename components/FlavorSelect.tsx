import * as React from "react";

import { CirclePlus, CircleX } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FlavorSelectProps } from "@/types/product";

export function FlavorSelect({
  flavors,
  selectedFlavors,
  handleFlavorRemove,
  handleFlavorAdd,
}: FlavorSelectProps) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-3">
        <div className="flex flex-wrap bg-slate-800 rounded-sm p-4 gap-2">
          {selectedFlavors.length === 0 ? (
            <p className="text-sm text-gray-400">尚未選擇口味</p>
          ) : (
            selectedFlavors.map((flavor) => (
              <Badge
                key={flavor.id}
                variant="secondary"
                className="text-lg font-semibold rounded-full bg-amber-900"
                onClick={() => handleFlavorRemove(flavor)}
              >
                <span className="font-semibold mr-2">{flavor.name}</span>
                <button className="size-6">
                  <CircleX className="w-full h-full" />
                </button>
              </Badge>
            ))
          )}
        </div>

        <Separator />

        {flavors
          .filter(
            (flavor) =>
              !selectedFlavors.some((selected) => selected.id === flavor.id)
          )
          .map((flavor) => (
            <Badge
              key={flavor.id}
              variant="secondary"
              className="text-lg font-semibold rounded-full"
              onClick={() => handleFlavorAdd(flavor)}
            >
              <span className="font-semibold mr-2">{flavor.name}</span>
              <button className="size-6">
                <CirclePlus className="w-full h-full" />
              </button>
            </Badge>
          ))}
      </div>
    </div>
  );
}
