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
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Detalji narudžbine - {order.orderNumber}</DialogTitle>
        </DialogHeader>
        <div>
          <p>
            <strong>Kupac:</strong> {order.customerName}
          </p>
          <p>
            <strong>Email:</strong> {order.email}
          </p>
          <p>
            <strong>Datum:</strong>{" "}
            {order._createdAt &&
              new Date(order._createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Proizvod</TableHead>
              <TableHead>Količina</TableHead>
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
                        alt="slika proizvoda"
                        height={50}
                        width={50}
                        className="hoverEffect overflow-hidden rounded-sm border hover:scale-105"
                      />
                    </Link>
                  )}
                  {product.product && product.product.name}
                </TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  <PriceFormatter
                    amount={product.product?.price}
                    className="font-medium text-black"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex items-center justify-between px-2 text-right">
          <strong>Ukupno:</strong>
          <PriceFormatter
            amount={order.discountedPrice}
            className="font-bold text-black"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;
