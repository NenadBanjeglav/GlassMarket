import { Product } from "@/sanity.types";
import React from "react";
import PriceFormatter from "./PriceFormatter";
import { cn } from "@/lib/utils";

interface Props {
  product: Product;
  className?: string;
}

const PriceView = ({ product, className }: Props) => {
  const { price, discount } = product;

  const discountedPrice =
    discount && discount > 0 ? price! - (discount * price!) / 100 : price;

  return (
    <div className="flex items-center justify-between gap-5">
      <div className="flex items-center gap-2">
        <PriceFormatter amount={discountedPrice} className={className} />

        {discount! > 0 && (
          <PriceFormatter
            amount={price}
            className={cn("text-xs font-medium line-through", className)}
          />
        )}
      </div>
    </div>
  );
};

export default PriceView;
