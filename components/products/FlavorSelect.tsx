"use client";

import { updateFlavorStatuses } from "@/actions/flavors";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Flavor } from "@/types/product";
import { useState } from "react";
import { toast } from "sonner";

interface FlavorSelectProps extends React.HTMLAttributes<HTMLDivElement> {
  flavors: Flavor[];
}

export function FlavorSelect({ flavors }: FlavorSelectProps) {
  const originalActiveFlavors = flavors.filter((f) => f.is_active);
  const originalInActiveFlavors = flavors.filter((f) => !f.is_active);

  const [activeFlavors, setActiveFlavors] = useState(originalActiveFlavors);
  const [inActiveFlavors, setInActiveFlavors] = useState(
    originalInActiveFlavors
  );

  const handleCancel = () => {
    setActiveFlavors(originalActiveFlavors);
    setInActiveFlavors(originalInActiveFlavors);
  };

  const handleSave = async () => {
    const originalActiveIds = new Set(originalActiveFlavors.map((p) => p.id));
    const originalInactiveIds = new Set(
      originalInActiveFlavors.map((p) => p.id)
    );

    const currentActiveIds = new Set(activeFlavors.map((p) => p.id));
    const currentInactiveIds = new Set(inActiveFlavors.map((p) => p.id));

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

    toast.promise(updateFlavorStatuses(updates), {
      loading: "口味更新中...",
      success: () => {
        return "口味更新完成";
      },
      error: "口味更新失敗",
    });
  };

  const handleAdd = (flavor: Flavor) => {
    if (activeFlavors.find((p) => p.id === flavor.id)) return;

    setActiveFlavors((prev) => [...prev, flavor]);
    setInActiveFlavors((prev) => prev.filter((p) => p.id !== flavor.id));
  };

  const handleRemove = (flavor: Flavor) => {
    setInActiveFlavors((prev) => [...prev, flavor]);
    setActiveFlavors((prev) => prev.filter((p) => p.id !== flavor.id));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>編輯</Button>
      </DialogTrigger>
      <DialogDescription></DialogDescription>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>編輯架上口味</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <p className="px-2">已選口味</p>
            <ScrollArea className="max-h-[250px] rounded-md border dark:bg-cyan-950">
              <div className="px-4 divide-y">
                {activeFlavors.map((flavor) => (
                  <div key={flavor.id} className="flex py-2 items-center">
                    <p className="text-lg min-w-[150px]">{flavor.name}</p>
                    <Button
                      variant={"destructive"}
                      onClick={() => handleRemove(flavor)}
                    >
                      移除
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div className="grid gap-3">
            <p className="px-2">口味清單</p>
            <ScrollArea className="max-h-[250px] rounded-md border dark:bg-slate-900">
              <div className="px-4 divide-y">
                {inActiveFlavors.map((flavor) => (
                  <div key={flavor.id} className="flex py-2 items-center">
                    <p className="text-lg min-w-[150px]">{flavor.name}</p>
                    <Button
                      variant={"secondary"}
                      onClick={() => handleAdd(flavor)}
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
