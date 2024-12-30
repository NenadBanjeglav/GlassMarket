"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Loader, SearchIcon, X } from "lucide-react";
import { Input } from "./ui/input";
import { client } from "@/sanity/lib/client";
import { Product } from "@/sanity.types";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";

const Search = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const fetchProducts = useCallback(async () => {
    if (!search) {
      setProducts([]);
      return;
    }
    setLoading(true);

    try {
      const query = `*[_type == "product" && name match $search] | order(name asc)`;
      const params = { search: `${search}*` };
      const response = await client.fetch(query, params);
      setProducts(response);
    } catch (error) {
      console.error(`Error fetching products.`, error);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchProducts();
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [search, fetchProducts]);

  return (
    <Dialog open={showSearch} onOpenChange={() => setShowSearch(!showSearch)}>
      <DialogTrigger onClick={() => setShowSearch(!showSearch)}>
        <div className="hoverEffect relative  flex items-center gap-1 rounded-md border border-gray-200 px-2 py-1 text-xs shadow-md hover:shadow-none md:gap-2 md:text-sm">
          <SearchIcon className=" size-[26px] text-darkBlue" />
          <span className="hidden text-base font-semibold md:inline-block">
            Traži proizvod
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="flex h-[90vh] max-w-5xl flex-col">
        <DialogHeader>
          <DialogTitle>Pretraga proizvoda</DialogTitle>
          <form onSubmit={(e) => e.preventDefault()} className="relative">
            <Input
              placeholder="Traži proizvod po imenu..."
              className="flex-1"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <X
                onClick={() => setSearch("")}
                className="hoverEffect absolute right-12 top-[11px] size-4 hover:text-red-600"
              />
            )}
            <button
              type="submit"
              className={`hoverEffect absolute right-0 top-0 flex h-full w-10 items-center justify-center rounded-r-md  hover:bg-darkBlue hover:text-white ${search ? "bg-darkBlue text-white" : "bg-darkBlue/10"}`}
            >
              <SearchIcon className=" size-5" />
            </button>
          </form>
        </DialogHeader>
        <div className="size-full overflow-y-scroll rounded-md border border-darkBlue/20">
          <div>
            {loading ? (
              <p className="flex flex-col items-center justify-center gap-1 px-6 py-10 text-center font-semibold text-darkBlue">
                <Loader className="size-6 animate-spin" />
                Pretraga u toku...
              </p>
            ) : products.length ? (
              products.map((product: Product) => (
                <div
                  key={product._id}
                  className="  overflow-hidden border-b bg-white last:border-b-0"
                >
                  <div className=" flex items-center p-1">
                    <Link
                      href={`/product/${product.slug?.current}`}
                      className="group relative size-28  shrink-0 overflow-hidden   rounded-md md:size-24"
                      onClick={() => setShowSearch(false)}
                    >
                      {product.image && (
                        <Image
                          src={urlFor(product.image).url()}
                          alt={`${product.name} image`}
                          width={200}
                          height={200}
                          className="hoverEffect size-full object-cover group-hover:scale-110"
                        />
                      )}
                      {!product.inStock && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <p className="text-center text-lg font-bold text-white">
                            Nema na Stanju
                          </p>
                        </div>
                      )}
                    </Link>
                    <div className="group flex h-full grow flex-col  px-4 md:flex-row md:justify-between">
                      <Link
                        href={`/product/${product.slug?.current}`}
                        onClick={() => setShowSearch(false)}
                        className="flex h-full flex-col items-start justify-between "
                      >
                        <h3 className="line-clamp-1 text-sm font-semibold text-gray-800 md:text-lg">
                          {product.name}
                        </h3>
                        <p className="line-clamp-1 text-sm text-gray-600">
                          {product.description}
                        </p>
                        <PriceView product={product} className="md:text-lg" />
                      </Link>
                      <div className="mr-4 mt-1 w-full md:w-60">
                        <AddToCartButton product={product} />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-10 text-center font-semibold tracking-wide">
                {search && !products.length ? (
                  <p className="text-gray-600">
                    Ništa ne odgovara ključnoj reči{" "}
                    <span className="text-red-600 underline">
                      &ldquo;{search}&ldquo;
                    </span>
                    . Molim te pokušaj nešto drugo.
                  </p>
                ) : (
                  <p className="flex flex-col items-center justify-center gap-1 text-gray-600">
                    <SearchIcon className="size-5" />
                    <span>
                      Pretražite i istražite proizvode iz{" "}
                      <span className="text-darkBlue">Glass</span>
                      <span className="text-red-700">Market</span>.
                    </span>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Search;
