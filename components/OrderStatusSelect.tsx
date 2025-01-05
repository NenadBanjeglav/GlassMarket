"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { updateOrderStatus } from "@/sanity/helpers";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { sendOrderStatusEmailUpdate } from "@/lib/actions";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const OrderStatusSelect = ({ order }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(order.status);
  console.log(order);

  const statuses = [
    { title: "Confirmed", value: "confirmed" },
    { title: "Shipped", value: "shipped" },
    { title: "Cancelled", value: "cancelled" },
    { title: "Ready For Pick Up", value: "readyForPickUp" },
  ];

  const handleValueChange = async (newValue: string) => {
    try {
      setIsLoading(true);
      await updateOrderStatus(order.orderNumber, newValue);
      setCurrentStatus(newValue);
      await sendOrderStatusEmailUpdate(
        order.orderNumber.slice(-5),
        newValue,
        order.email,
        order.customerName
      );
      toast.success("Uspesno promenjen status porudzbine");
    } catch (error) {
      console.error(`Error changing order Status.`, error);
      toast.error("Nije uspela promena statusa porudzbine");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Select
      defaultValue={currentStatus}
      onValueChange={handleValueChange}
      disabled={isLoading}
    >
      <SelectTrigger className="w-full">
        <SelectValue>
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader className="animate-spin" size={24} />
            </div>
          ) : (
            <span
              className={`rounded-full px-2 py-1 text-xs font-semibold capitalize ${currentStatus === "confirmed" && "bg-green-100 text-green-600"} ${currentStatus === "shipped" && "bg-blue-100 text-blue-600"} ${currentStatus === "cancelled" && "bg-yellow-100 text-yellow-800"} ${currentStatus === "readyForPickUp" && "bg-blue-100 text-blue-600"}`}
            >
              {statuses.find((status) => status.value === currentStatus)?.title}
            </span>
          )}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        {statuses.map((status) => (
          <SelectItem key={status.value} value={status.value}>
            {status.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default OrderStatusSelect;
