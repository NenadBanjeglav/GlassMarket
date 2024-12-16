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

  useEffect(() => {
    setInputCount(getItemCount(product._id).toString());
  }, [getItemCount(product._id)]);

  const handleRemoveProduct = () => {
    removeItem(product._id);
    setInputCount(getItemCount(product._id).toString());
    toast.success(`${product.name}... izbačen iz korpe!`);
  };

  const handleAddProduct = () => {
    addItem(product);
    setInputCount(getItemCount(product._id).toString());
    toast.success(`${product.name}... dodat u korpu!`);
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
    setInputCount(getItemCount(product._id).toString());
  };

  // const itemCount = getItemCount(product._id);

  return (
    <div className={cn("flex items-center gap-2 pb-1 text-base", className)}>
      <Button
        variant="outline"
        size="icon"
        className="size-5"
        onClick={handleRemoveProduct}
      >
        <Minus />
      </Button>
      <input
        type="text"
        value={inputCount}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        className="w-8 rounded-md border text-center font-semibold text-darkBlue"
      />
      <Button
        variant="outline"
        size="icon"
        className="size-5"
        onClick={handleAddProduct}
      >
        <Plus />
      </Button>
    </div>
  );
};

export default QuantityButtons;
