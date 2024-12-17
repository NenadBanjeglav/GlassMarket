"use client";

import { Category } from "@/sanity.types";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
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
import { useMediaQuery } from "@/lib/useMediaQuery";

interface Props {
  categories: Category[];
}

const ALL_OPTION = { _id: "", title: "Sve", slug: { current: "" } };

const CategorySelector = ({ categories }: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>(ALL_OPTION._id);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleSelectCategory = (categoryId: string, slug: string) => {
    setValue(categoryId);
    const params = new URLSearchParams(searchParams);
    if (categoryId) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
    setOpen(false);
  };

  const categoriesWithAllOption = [ALL_OPTION, ...categories];

  const CategoryList = () => (
    <Command>
      <CommandInput placeholder="Trazi kategoriju..." className="h-9" />
      <CommandList>
        <CommandEmpty>Kategorija nije pronadjena.</CommandEmpty>
        <CommandGroup>
          {categoriesWithAllOption.map((category) => (
            <CommandItem
              className="cursor-pointer"
              onSelect={() => {
                handleSelectCategory(
                  category._id,
                  category.slug?.current || ""
                ); // Update category
                setValue(category._id); // Update selected state
              }}
              value={category.title}
              key={category._id}
            >
              {category.title}
              <Check
                className={cn(
                  "ml-auto",
                  value === category._id ? "opacity-100" : "opacity-0"
                )}
              />
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between md:w-[200px]"
          >
            {value
              ? categoriesWithAllOption.find(
                  (category) => category?._id === value
                )?.title
              : "Filtriraj po kategoriji"}
            <ChevronsUpDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 md:w-[200px]">
          <CategoryList />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? categoriesWithAllOption.find(
                (category) => category?._id === value
              )?.title
            : "Filtriraj po kategoriji"}
          <ChevronsUpDown />
        </Button>
      </DrawerTrigger>
      <DrawerContent autoFocus={false}>
        <DrawerHeader>
          <DrawerTitle>Izaberite Kategoriju</DrawerTitle>
          <DrawerDescription className="sr-only" />
        </DrawerHeader>
        <div className="mt-4 border-t p-4">
          <CategoryList />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CategorySelector;
