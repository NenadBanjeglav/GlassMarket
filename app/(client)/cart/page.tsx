"use client";

import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import Loader from "@/components/Loader";
import NoAccessToCart from "@/components/NoAccessToCart";

import QuantityButtons from "@/components/QuantityButtons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { urlFor } from "@/sanity/lib/image";
import userCartStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import PriceFormatter from "@/components/PriceFormatter";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import OrderForm from "@/components/OrderForm";

const CartPage = () => {
  const { user } = useUser();
  const [isClient, setIsClient] = useState(false);

  const {
    deleteCartProduct,
    getItemCount,
    getSubtotalPrice,
    getTotalPrice,
    resetCart,
    getGroupedItems,
  } = userCartStore();

  const { isSignedIn } = useAuth();

  const groupedItems = getGroupedItems();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loader />;
  }

  const handleDeleteProduct = (id: string) => {
    deleteCartProduct(id);
    toast.success("Product deleted successfully!");
  };

  const handleResetCart = () => {
    const confirmed = window.confirm(
      `Are you sure you want to reset your Cart?`
    );
    if (confirmed) {
      resetCart();
      toast.success("Cart successfully reseted!");
    }
  };

  return (
    <div className="bg-gray-50 pb-10">
      {isSignedIn ? (
        <Container>
          {groupedItems.length ? (
            <>
              <div className="flex items-center justify-center gap-2  py-5">
                <h1 className="text-center text-2xl font-semibold text-darkBlue">
                  Korpa
                </h1>
              </div>
              <div className="grid pb-40 md:gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-4 rounded-t-lg border bg-white p-2.5 text-base font-semibold md:grid-cols-6">
                    <h2 className="col-span-1 md:col-span-3 md:ml-6">
                      Proizvod
                    </h2>
                    <h2 className=" text-center ">Cena</h2>
                    <h2 className=" text-center ">Kol.</h2>
                    <h2 className=" text-right md:text-center">Ukupno</h2>
                  </div>

                  <div className="rounded-b-lg border border-t-0 bg-white">
                    {groupedItems.map(({ product }) => {
                      const itemCount = getItemCount(product._id);
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
                          <div className="flex items-center justify-center">
                            <PriceFormatter
                              amount={product.price}
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
                              amount={
                                product.price ? product.price * itemCount : 0
                              }
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
                  <div className="hidden w-full rounded-lg border bg-white p-6 md:inline-block">
                    <h2 className="mb-4 text-xl font-semibold">
                      Pregled porudžbine
                    </h2>
                    <div className="w-full space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Cena</span>
                        <PriceFormatter amount={getTotalPrice()} />
                      </div>

                      <div className="flex place-items-center justify-between">
                        <span>Popust</span>
                        <PriceFormatter
                          amount={getSubtotalPrice() - getTotalPrice()}
                        />
                      </div>
                      <Separator />
                      <div className="flex place-items-center justify-between">
                        <span>Ukupno</span>
                        <PriceFormatter amount={getSubtotalPrice()} />
                      </div>

                      <div className="flex flex-col gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="w-full" size="lg">
                              Naruči
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Detalji o kupcu</DialogTitle>
                              <DialogDescription className="sr-only" />
                            </DialogHeader>
                            <OrderForm
                              user={user!}
                              orderItems={groupedItems!}
                            />
                          </DialogContent>
                        </Dialog>
                        <Link
                          href="/"
                          className="hoverEffect text-center text-sm text-primary hover:underline"
                        >
                          Dodaj jos proizvoda
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fixed bottom-0 left-0 w-full bg-lightBg md:hidden">
                <div className="mx-4 rounded-lg border bg-white p-4">
                  <h2 className="mb-2 text-lg font-semibold">
                    Pregled porudžbine
                  </h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Cena</span>
                      <PriceFormatter amount={getTotalPrice()} />
                    </div>
                    <div className="flex justify-between">
                      <span>Popust</span>
                      <PriceFormatter
                        amount={getSubtotalPrice() - getTotalPrice()}
                      />
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span>Ukupno</span>
                      <PriceFormatter amount={getSubtotalPrice()} />
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full" size="lg">
                          Naruči
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Detalji o kupcu</DialogTitle>
                          <DialogDescription className="sr-only" />
                        </DialogHeader>
                        <OrderForm user={user!} orderItems={groupedItems!} />
                      </DialogContent>
                    </Dialog>

                    <Link
                      href="/"
                      className="block text-center text-sm text-primary hover:underline"
                    >
                      Dodaj jos proizvoda
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
        </Container>
      ) : (
        <NoAccessToCart />
      )}
    </div>
  );
};

export default CartPage;
