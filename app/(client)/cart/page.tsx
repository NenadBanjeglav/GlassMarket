"use client";

import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";

import QuantityButtons from "@/components/QuantityButtons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { urlFor } from "@/sanity/lib/image";
import userCartStore from "@/store";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import PriceFormatter from "@/components/PriceFormatter";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import CheckoutSteps from "@/components/CheckoutSteps";

const CartPage = () => {
  const [isClient, setIsClient] = useState(false);

  const {
    deleteCartProduct,
    getItemCount,
    getSubtotalPrice,
    getTotalPrice,
    resetCart,
    getGroupedItems,
    getTotalWeight,
  } = userCartStore();

  const groupedItems = getGroupedItems();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loader />;
  }

  const handleDeleteProduct = (id: string) => {
    deleteCartProduct(id);
    toast.success("Proizvod je uspešno obrisan!");
  };

  const handleResetCart = () => {
    const confirmed = window.confirm(
      "Da li ste sigurni da želite da resetujete korpu?"
    );
    if (confirmed) {
      resetCart();
      toast.success("Korpa je uspešno resetovana!");
    }
  };

  return (
    <main className="bg-white">
      <Container>
        <div className="pt-10">
          <h2 className="text-center text-2xl font-semibold uppercase text-gray-600">
            Vaša <span className="text-lightBlue">Korpa</span>
          </h2>
          <p className="text-center text-gray-500">
            Vaša korpa - Jedan korak bliže savršenim staklenim rešenjima!
          </p>
        </div>
        <CheckoutSteps current={0} />
        {groupedItems.length ? (
          <>
            <div className="grid pb-40 md:gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="grid grid-cols-4 rounded-t-lg border bg-white p-2.5 text-base font-semibold md:grid-cols-6">
                  <h2 className="col-span-1 md:col-span-3 md:ml-6">Proizvod</h2>
                  <h2 className=" text-center ">Cena</h2>
                  <h2 className=" text-center ">Kol.</h2>
                  <h2 className=" text-right md:text-center">Ukupno</h2>
                </div>

                <div className="rounded-b-lg border border-t-0 bg-white">
                  {groupedItems.map(({ product }) => {
                    const itemCount = getItemCount(product._id);
                    const { discount, price } = product;
                    const priceOfProduct = price! * (1 - (discount || 0) / 100);

                    return (
                      <div
                        key={product._id}
                        className="grid grid-cols-4 border-b p-2.5 last:border-b-0 md:grid-cols-6"
                      >
                        <div className="col-span-1 flex items-center md:col-span-3">
                          <Trash2
                            onClick={() => handleDeleteProduct(product._id)}
                            className="hoverEffect mr-1 size-4 cursor-pointer text-gray-500 hover:text-red-600 md:size-5"
                          />
                          {product.image && (
                            <Link
                              href={`/product/${product.slug?.current}`}
                              className="group mr-2 overflow-hidden rounded-md border p-0.5 md:p-1"
                            >
                              <Image
                                src={urlFor(product.image).url()}
                                alt="product image"
                                width={300}
                                height={300}
                                className="hoverEffect inline-block size-10 overflow-hidden object-cover group-hover:scale-105 md:h-14 md:w-full"
                              />
                            </Link>
                          )}
                          <h2 className="hidden text-sm md:inline-block">
                            {product.name}
                          </h2>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          {discount! > 0 && (
                            <PriceFormatter
                              amount={price}
                              className="truncate text-[8px] line-through"
                            />
                          )}
                          <PriceFormatter
                            amount={priceOfProduct}
                            className="truncate text-xs"
                          />
                        </div>
                        <QuantityButtons
                          product={product}
                          className="mx-auto gap-1 text-base md:gap-1"
                        />
                        <div className="flex items-center justify-end md:justify-center">
                          <PriceFormatter
                            className="truncate text-xs"
                            amount={priceOfProduct * itemCount}
                          />
                        </div>
                      </div>
                    );
                  })}
                  <Button
                    onClick={handleResetCart}
                    variant="destructive"
                    className="m-5 font-semibold"
                  >
                    Resetuj Korpu
                  </Button>
                </div>
              </div>
              <div className="col-span-1">
                <div className="mt-4 w-full rounded-lg border bg-white p-6 md:mt-0">
                  <h2 className="mb-4 text-xl font-semibold">
                    Pregled porudžbine
                  </h2>
                  <div className="w-full space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Cena Robe:</span>
                      <PriceFormatter amount={getTotalPrice()} />
                    </div>

                    {getSubtotalPrice().subtotal < getTotalPrice() && (
                      <div className="flex place-items-center justify-between">
                        <span>Akcijski Popust:</span>
                        <PriceFormatter
                          amount={getSubtotalPrice().subtotal - getTotalPrice()}
                        />
                      </div>
                    )}

                    <Separator />
                    <div className="flex place-items-center justify-between">
                      <span>Ukupno:</span>
                      <PriceFormatter amount={getSubtotalPrice().subtotal} />
                    </div>
                    <div className="flex place-items-center justify-between">
                      <span>Težina:</span>
                      <span className="text-sm font-semibold text-darkText">
                        {(getTotalWeight() / 1000).toFixed(2)} kg
                      </span>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button asChild variant="default">
                        <Link
                          href="/customer-details"
                          className="hoverEffect text-center text-sm text-primary hover:underline"
                        >
                          Nastavite sa Plaćanjem
                        </Link>
                      </Button>

                      <Link
                        href="/store"
                        className="hoverEffect text-center text-sm text-primary hover:underline"
                      >
                        Dodaj jos proizvoda
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <EmptyCart />
        )}
      </Container>
    </main>
  );
};

export default CartPage;
