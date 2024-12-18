"use client";

import userCartStore from "@/store";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CartIcon = () => {
  const [isClient, setIsClient] = useState(false);

  const itemCount = userCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return null;

  return (
    <Link
      href="/cart"
      className="hoverEffect relative  flex items-center gap-1 rounded-md border border-gray-200 px-2 py-1 text-xs shadow-md hover:shadow-none md:gap-2 md:text-sm"
    >
      <ShoppingCart className=" size-[26px] text-darkBlue" />
      <span className="hidden text-base font-semibold md:inline-block">
        Korpa
      </span>
      <div className="absolute right-[-10px] top-[-10px] z-10 flex size-5 items-center justify-center rounded-full bg-red-500">
        <span className="text-[9px] font-bold text-white">{itemCount}</span>
      </div>
    </Link>
  );
};

export default CartIcon;
