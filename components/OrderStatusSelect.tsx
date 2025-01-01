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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const OrderStatusSelect = ({ order }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(order.status);

  const statuses = [
    { title: "Confirmed", value: "confirmed" },
    { title: "Shipped", value: "shipped" },
    { title: "Cancelled", value: "cancelled" },
  ];

  const handleValueChange = async (newValue: string) => {
    try {
      setIsLoading(true);
      await updateOrderStatus(order.orderNumber, newValue);
      setCurrentStatus(newValue);
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
              className={`${currentStatus === "confirmed" && "text-green-500"} ${currentStatus === "shipped" && "text-blue-500"} ${currentStatus === "cancelled" && "text-red-500"}`}
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
