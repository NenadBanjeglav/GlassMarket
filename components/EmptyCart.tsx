import { ShoppingCart } from "lucide-react";
import React from "react";
import { motion } from "motion/react";
import Link from "next/link";

const EmptyCart = () => {
  return (
    <div className=" flex h-screen flex-col items-center justify-center gap-3 bg-white py-20">
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="inline-block"
      >
        <ShoppingCart size={64} className="mx-auto text-gray-400" />
      </motion.div>

      <h2 className="text-3xl font-bold text-gray-800">Korpa je prazna!</h2>
      <p className="mx-auto max-w-md text-center text-gray-600">
        Izgleda da još uvek niste dodali nijedan proizvod u korpu. Istražite
        našu ponudu i pronađite proizvod koji vam odgovara!
      </p>
      <Link
        href="/store"
        className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Započnite kupovinu
      </Link>
    </div>
  );
};

export default EmptyCart;
