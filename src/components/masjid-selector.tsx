"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function MasjidSelector({
  items,
  change,
}: {
  items:
    | {
        label: string;
        value: string;
      }[]
    | undefined;
  change: (e: string) => void;
}) {
  const handleChange = (e: string) => {
    change(e);
  };
  return (
    <div>
      <Select onValueChange={handleChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Masjid" />
        </SelectTrigger>
        <SelectContent>
          {items &&
            items.map((item, index) => (
              <SelectItem key={index} value={item.value}>
                {item.label.slice(0, 1).toUpperCase() + item.label.slice(1)}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
}
