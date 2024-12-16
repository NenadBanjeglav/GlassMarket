import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  amount: number | undefined;
  className?: string;
}

const PriceFormatter = ({ amount, className }: Props) => {
  const formatedPrice = new Number(amount).toLocaleString("sr-RS", {
    currency: "RSD",
    style: "currency",
    minimumFractionDigits: 0,
  });

  return (
    <span className={cn("text-sm font-semibold text-darkText", className)}>
      {formatedPrice}
    </span>
  );
};

export default PriceFormatter;
