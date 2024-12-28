import { MY_ORDERS_QUERYResult } from "@/sanity.types";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import PriceFormatter from "./PriceFormatter";

interface Props {
  order: MY_ORDERS_QUERYResult[number] | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailsDialog: React.FC<Props> = ({ order, isOpen, onClose }) => {
  if (!order) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" my-10 max-h-[600px] max-w-3xl overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Detalji porudžbine</DialogTitle>
        </DialogHeader>
        <div>
          <p>
            <strong>Broj:</strong> {order.orderNumber!.slice(-5)}
          </p>
          <p>
            <strong>Kupac:</strong> {order.customerName}
          </p>
          <p>
            <strong>Email:</strong> {order.email}
          </p>
          <p>
            <strong>Datum:</strong>{" "}
            {order._createdAt &&
              new Date(order._createdAt).toLocaleDateString("sr-Latn", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
          </p>

          <p>
            <strong>Isporuka:</strong>{" "}
            {order.deliveryMethod === "store"
              ? "Prezimanje u prodavnici"
              : "Dostava"}
          </p>
          <p>
            <strong>Plaćanje:</strong>{" "}
            {order.paymentMethod === "bankTransfer"
              ? "Direktna bankovna transakcija"
              : "Plaćanje prilikom preuzimanja"}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {order.status === "confirmed" && "Potvrdjeno"}
            {order.status === "shipped" && "Poslato"}
            {order.status === "pickedUp" && "Preuzeto"}
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Proizvod</TableHead>
              <TableHead>Cena/kom</TableHead>
              <TableHead>Kol.</TableHead>
              <TableHead>Cena</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.products?.map((product) => (
              <TableRow key={product._key}>
                <TableCell className="flex items-center gap-2">
                  {product.product?.image && (
                    <Link href={`/product/${product.product.slug?.current}`}>
                      <Image
                        src={urlFor(product.product.image).url()}
                        alt="product image"
                        height={50}
                        width={50}
                        className="hoverEffect overflow-hidden rounded-sm border hover:scale-105"
                      />
                    </Link>
                  )}
                  {product.product && product.product.name}
                </TableCell>
                <TableCell>
                  {product.product?.price && (
                    <PriceFormatter
                      amount={
                        product.product?.price *
                        (1 - (product.product?.discount || 0) / 100)
                      }
                    />
                  )}
                </TableCell>
                <TableCell className="text-sm font-semibold text-darkText">
                  {product.quantity}
                </TableCell>
                <TableCell>
                  {product.product?.price && (
                    <PriceFormatter
                      amount={
                        product.product?.price *
                        (1 - (product.product.discount || 0) / 100) *
                        product.quantity!
                      }
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className=" flex items-center  justify-between px-2 text-right">
          <strong>Cena robe:</strong>
          <PriceFormatter
            amount={order.priceOfProducts}
            className="font-bold text-black"
          />
        </div>
        {order.deliveryMethod === "delivery" && (
          <div className=" flex items-center  justify-between px-2 text-right">
            <strong>Dostava:</strong>
            <PriceFormatter
              amount={order.deliveryPrice}
              className="font-bold text-black"
            />
          </div>
        )}
        <div className=" flex items-center  justify-between px-2 text-right">
          <strong>Za platiti:</strong>
          <PriceFormatter
            amount={order.totalPrice}
            className="font-bold text-black"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;
