"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { cn } from "@/lib/utils";

const VOLUME_OPTIONS = [
  { value: 100, label: "100 ml" },
  { value: 250, label: "250 ml" },
  { value: 500, label: "500 ml" },
  { value: 750, label: "750 ml" },
  { value: 1000, label: "1 L" },
  { value: 2000, label: "2 L" },
  { value: 5000, label: "5 L" },
];

const ALL_OPTION = { value: null, label: "Sve" };

const VolumeSelector = () => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelectVolume = (value: number | null) => {
    setSelectedValue(value);
    const params = new URLSearchParams(searchParams);
    if (value !== null) {
      params.set("volume", value.toString());
    } else {
      params.delete("volume");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
    setOpen(false);
  };

  const optionsWithAll = [ALL_OPTION, ...VOLUME_OPTIONS];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full  justify-between md:w-[200px]"
        >
          {selectedValue !== null
            ? optionsWithAll.find((option) => option.value === selectedValue)
                ?.label
            : "Filtriraj po zapremini"}
          <ChevronsUpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 md:w-[200px]">
        <Command>
          <CommandInput placeholder="Traži zapreminu..." className="h-9" />
          <CommandList>
            <CommandEmpty>Nema rezultata.</CommandEmpty>
            <CommandGroup>
              {optionsWithAll.map((option) => (
                <CommandItem
                  className="cursor-pointer"
                  onSelect={() => handleSelectVolume(option.value)}
                  value={option.label}
                  key={option.value || "all"}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedValue === option.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default VolumeSelector;