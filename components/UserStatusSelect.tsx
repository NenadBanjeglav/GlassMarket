"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { toast } from "sonner";
import { Loader } from "lucide-react";
import { updateUserStatus } from "@/sanity/helpers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UserStatusSelect = ({ user }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(user.userStatus);

  const statuses = [
    { title: "Active", value: "active" },
    { title: "Banned", value: "banned" },
  ];

  const handleValueChange = async (newValue: string) => {
    try {
      setIsLoading(true);
      await updateUserStatus(user.email, newValue);
      console.log(newValue);
      setCurrentStatus(newValue);
      toast.success("Status korisnika uspešno ažuriran");
    } catch (error) {
      console.error(`Greška pri promeni statusa korisnika.`, error);
      toast.error("Ažuriranje statusa korisnika nije uspelo");
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
              className={`rounded-full px-2 py-1 text-xs font-semibold capitalize ${currentStatus === "active" && "bg-green-100 text-green-600"} ${currentStatus === "banned" && "bg-red-100 text-red-600"}`}
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

export default UserStatusSelect;
