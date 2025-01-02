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
import OrderStatusSelect from "./OrderStatusSelect";

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
                <TableRow className="h-12 cursor-pointer hover:bg-gray-100">
                  <TableCell
                    className="font-medium"
                    onClick={() => handleOrderClicked(order)}
                  >
                    {order.orderNumber?.slice(-5)}
                  </TableCell>
                  <TableCell>
                    {order._createdAt &&
                      new Date(order._createdAt).toLocaleDateString("sr-Latn", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                      })}
                  </TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.email}</TableCell>
                  <TableCell>
                    <PriceFormatter
                      amount={order.totalPrice}
                      className="font-medium text-black"
                    />
                  </TableCell>
                  <TableCell>
                    <OrderStatusSelect order={order} />
                  </TableCell>
                </TableRow>
              </TooltipTrigger>
              <TooltipContent>
                <p>Kliknite na BROJ porudzbine da biste vidite detalje</p>
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
