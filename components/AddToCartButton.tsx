"use client";

import { Product } from "@/sanity.types";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import QuantityButtons from "./QuantityButtons";
import PriceFormatter from "./PriceFormatter";
import userCartStore from "@/store";

interface Props {
  product: Product;
  className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
  const [isClient, setIsClient] = useState(false);
  const { addItem, getItemCount } = userCartStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const itemCount = getItemCount(product._id);

  const priceOfProduct = product.price! * (1 - (product.discount || 0) / 100);

  if (!isClient) return null;

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product.name?.substring(0, 12)}...dodat u korpu!`);
  };

  return (
    <div>
      {itemCount ? (
        <div className="text-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Količina</span>
            <QuantityButtons product={product} />
          </div>
          <div className="flex items-center justify-between border-t pt-1">
            <span className="text-xs text-muted-foreground">Cena</span>
            <PriceFormatter amount={priceOfProduct * itemCount} />
          </div>
        </div>
      ) : (
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={cn(
            "bg-darkBlue/10 text-black border-darkBlue py-2 my-2 w-full rounded-md font-medium hover:bg-darkBlue hover:text-white hoverEffect disabled:hover:cursor-not-allowed disabled:bg-darkBlue/10 disabled:text-gray-400  disabled:border-darkBlue/10",
            className
          )}
        >
          Dodaj u Korpu
        </Button>
      )}
    </div>
  );
};

export default AddToCartButton;
