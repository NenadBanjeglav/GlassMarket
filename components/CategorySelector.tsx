"use client";

import { Category } from "@/sanity.types";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
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

interface Props {
  categories: Category[];
}

const CategorySelector = ({ categories }: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelectCategory = (categoryId: string, slug: string) => {
    setValue(categoryId);
    const params = new URLSearchParams(searchParams);
    if (categoryId) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }
    router.replace(`?${params.toString()}`, { scroll: false }); // Prevent scroll
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? categories.find((category) => category?._id === value)?.title
            : "Filtriraj po kategoriji"}
          <ChevronsUpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 ">
        <Command>
          <CommandInput
            placeholder="Trazi kategoriju..."
            className="h-9"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const selectedCategory = categories.find((c) =>
                  c.title
                    ?.toLowerCase()
                    .includes(e.currentTarget.value.toLowerCase())
                );
                if (selectedCategory?.slug?.current) {
                  handleSelectCategory(
                    selectedCategory._id,
                    selectedCategory.slug.current
                  );
                }
              }
            }}
          />
          <CommandList>
            <CommandEmpty>Kategorija nije pronadjena.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  className="cursor-pointer"
                  onSelect={() =>
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    handleSelectCategory(category._id, category.slug?.current)
                  }
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
      </PopoverContent>
    </Popover>
  );
};

export default CategorySelector;
