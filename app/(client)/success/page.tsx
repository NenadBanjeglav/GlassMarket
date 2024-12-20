"use client";

import userCartStore from "@/store";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { motion } from "motion/react";
import { CheckIcon, Home, Package, ShoppingBag } from "lucide-react";
import Link from "next/link";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const deliveryMethod = searchParams.get("deliveryMethod");
  const { resetCart } = userCartStore();

  useEffect(() => {
    if (orderNumber) {
      resetCart();
    }
  }, [orderNumber, resetCart]);

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4 py-10 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl rounded-2xl bg-white px-8 py-12 text-center shadow-2xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto mb-8 flex size-24 items-center justify-center rounded-full bg-green-100 shadow-lg"
        >
          <CheckIcon className="size-12 text-teal-600" />
        </motion.div>
        <h1 className="mb-4 text-3xl font-bold text-gray-800">
          Porudžbina je potvrđena
        </h1>
        <div className="mb-8 space-y-4 text-center text-gray-600">
          <p>Hvala vam na kupovini!</p>
          <p>
            {deliveryMethod === "store" &&
              "Vaša porudžbina je u procesu obrade i uskoro će biti spremna za preuzimanje u našoj prodavnici."}
            {deliveryMethod === "delivery" &&
              "Vaša porudžbina je u procesu obrade i uskoro će biti poslata."}
          </p>
          <p>
            Broj porudžbine: <br />
            <span className="font-semibold text-black">{orderNumber}</span>
          </p>
        </div>
        <div className="mb-8 rounded-lg border border-gray-200 bg-green-50 p-4">
          <h2 className="mb-2 font-semibold text-green-800">Šta sledi?</h2>
          <ul className="space-y-1 text-sm text-green-700">
            {deliveryMethod === "delivery" && (
              <li>Obavestićemo vas kada vaša porudžbina bude poslata.</li>
            )}

            {deliveryMethod === "store" && (
              <li>
                Obavestićemo vas kada vaša porudžbina bude spremna za
                preuzimanje.
              </li>
            )}
            <li>Pratite status vaše porudžbine na našem sajtu.</li>
          </ul>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Link
            href="/"
            className="hoverEffect flex items-center justify-center rounded-lg bg-green-500 px-4 py-3 font-semibold text-white shadow-md hover:bg-green-600"
          >
            <Home className="mr-2 size-5" />
            Početna
          </Link>
          <Link
            href="/orders"
            className="hoverEffect flex items-center justify-center rounded-lg bg-green-500 px-4 py-3 font-semibold text-white shadow-md hover:bg-green-600"
          >
            <Package className="mr-2 size-5" />
            Porudžbine
          </Link>
          <Link
            href="/"
            className="hoverEffect flex items-center justify-center rounded-lg bg-green-500 px-4 py-3 font-semibold text-white shadow-md hover:bg-green-600"
          >
            <ShoppingBag className="mr-2 size-5" />
            Kupovina
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessPage;
