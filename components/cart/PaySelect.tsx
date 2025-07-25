import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaySelectProps {
  handlePayMethodChange: (value: string) => void;
}

export function PaySelect({ handlePayMethodChange }: PaySelectProps) {
  return (
    <Select defaultValue="cash" onValueChange={handlePayMethodChange}>
      <SelectTrigger className="w-1/2 text-xl mb-4">
        <SelectValue placeholder="付款方式" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="cash" className="text-xl">
            現金
          </SelectItem>
          <SelectItem value="linepay" className="text-xl">
            LINE Pay
          </SelectItem>
          <SelectItem value="treat" className="text-xl">
            招待
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
