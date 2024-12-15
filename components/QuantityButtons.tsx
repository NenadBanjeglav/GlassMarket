"use client";

import { Product } from "@/sanity.types";
import React from "react";
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
  const { addItem, removeItem, getItemCount } = userCartStore();

  const handleRemoveProduct = () => {
    removeItem(product._id);
    toast.success(`${product.name}...izbacen iz korpe!`);
  };
  const handleAddProduct = () => {
    addItem(product);
    toast.success(`${product.name}...dodat u korpu!`);
  };
  const itemCount = getItemCount(product._id);

  return (
    <div className={cn("flex items-center gap-1 pb-1 text-base", className)}>
      <Button
        variant="outline"
        size="icon"
        className="size-4 md:size-6"
        onClick={handleRemoveProduct}
      >
        <Minus />
      </Button>
      <span className="w-8 text-center font-semibold text-darkBlue">
        {itemCount}
      </span>
      <Button
        variant="outline"
        size="icon"
        className="size-4 md:size-6"
        onClick={handleAddProduct}
      >
        <Plus />
      </Button>
    </div>
  );
};

export default QuantityButtons;
