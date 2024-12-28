"use client";

import { MY_ORDERS_QUERYResult } from "@/sanity.types";
import React, { useState } from "react";
import { TableBody, TableCell, TableRow } from "./ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import PriceFormatter from "./PriceFormatter";
import OrderDetailsDialog from "./OrderDetailsDialog";

const OrdersComponent = ({ orders }: { orders: MY_ORDERS_QUERYResult }) => {
  const [selectedOrder, setSelectedOrder] = useState<
    MY_ORDERS_QUERYResult[number] | null
  >(null);

  const handleOrderClicked = (order: MY_ORDERS_QUERYResult[number]) => {
    setSelectedOrder(order);
  };

  return (
    <>
      <TableBody>
        <TooltipProvider>
          {orders.map((order) => (
            <Tooltip key={order.orderNumber}>
              <TooltipTrigger asChild>
                <TableRow
                  onClick={() => handleOrderClicked(order)}
                  className="h-12 cursor-pointer hover:bg-gray-100"
                >
                  <TableCell className="font-medium">
                    ...{order.orderNumber?.slice(-5) ?? "N/A"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order._createdAt &&
                      new Date(order._createdAt).toLocaleDateString("sr-Latn", {
                        day: "numeric",
                        month: "2-digit",
                        year: "numeric",
                      })}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order.customerName}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order.email}
                  </TableCell>
                  <TableCell>
                    <PriceFormatter
                      amount={order.totalPrice}
                      className="font-medium text-black"
                    />
                  </TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold capitalize ${
                        order.status === "confirmed"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status === "confirmed" ? "potvrđeno" : "poslato"}
                    </span>
                  </TableCell>
                </TableRow>
              </TooltipTrigger>
              <TooltipContent>
                <p>Kliknite da vidite detalje narudžbine</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </TableBody>
      <OrderDetailsDialog
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
};

export default OrdersComponent;
