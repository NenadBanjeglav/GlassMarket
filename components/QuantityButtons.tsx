"use client";

import { Product } from "@/sanity.types";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import userCartStore from "@/store";

interface Props {
  product: Product;
  className?: string;
  borderStyle?: string;
}

const QuantityButtons = ({ product, className }: Props) => {
  const { addItem, removeItem, getItemCount, setItemCount } = userCartStore();
  const [inputCount, setInputCount] = useState(
    getItemCount(product._id).toString()
  );
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setInputCount(getItemCount(product._id).toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getItemCount(product._id)]);

  const handleUpdateProduct = (action: "add" | "remove") => {
    setIsUpdating(true);
    const currentCount = parseInt(inputCount, 10) || 0;
    const newCount = action === "add" ? currentCount + 1 : currentCount - 1;

    setInputCount(newCount.toString());

    if (action === "add") {
      addItem(product);
      toast.success(`${product.name}... dodat u korpu!`);
    } else {
      removeItem(product._id);
      toast.success(`${product.name}... izbačen iz korpe!`);
    }

    setIsUpdating(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInputCount(value);
    }
  };

  const handleInputBlur = () => {
    const count = inputCount === "" ? 0 : parseInt(inputCount, 10);

    setItemCount(product._id, count);
  };

  return (
    <div className={cn("flex items-center gap-2 pb-1 text-base", className)}>
      <Button
        variant="outline"
        size="icon"
        className="size-5"
        onClick={() => handleUpdateProduct("remove")}
        disabled={isUpdating}
      >
        <Minus />
      </Button>
      <input
        type="text"
        value={inputCount}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        className="w-8 rounded-md border text-center font-semibold text-darkBlue"
        disabled={isUpdating}
      />
      <Button
        variant="outline"
        size="icon"
        className="size-5"
        onClick={() => handleUpdateProduct("add")}
        disabled={isUpdating}
      >
        <Plus />
      </Button>
    </div>
  );
};

export default QuantityButtons;
