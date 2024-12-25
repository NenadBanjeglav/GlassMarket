import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <div className="group overflow-hidden rounded-lg border border-gray-300 text-sm">
      <div className="relative overflow-hidden border-b border-b-gray-300">
        {product.image && (
          <Link href={`/product/${product.slug?.current}`}>
            <Image
              src={urlFor(product.image).url()}
              alt="Product Image"
              height={500}
              width={500}
              loading="lazy"
              className={`h-80 w-full overflow-hidden object-cover transition-transform duration-500 ${product.inStock && "group-hover:scale-105"}`}
            />
          </Link>
        )}
        {!product.inStock && (
          <div className="absolute left-0 top-0 flex size-full items-center justify-center bg-black/50">
            <p className="text-lg font-bold text-white">Nema na Stanju</p>
          </div>
        )}
        {product.status && product.inStock && (
          <div className="absolute left-1 top-1 z-10 flex flex-col items-center space-y-1 transition-opacity duration-300 group-hover:opacity-0">
            {product.status?.split("").map((char, index) => (
              <span className="font-semibold uppercase" key={index}>
                {char}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="flex h-full flex-col gap-2 p-5">
        <p className="line-clamp-1 text-base font-semibold capitalize tracking-wide text-gray-600">
          {product.name}
          <br />
        </p>
        <span className="line-clamp-1 text-sm text-gray-500">
          {product.description}
        </span>

        <PriceView product={product} />
        <AddToCartButton product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
