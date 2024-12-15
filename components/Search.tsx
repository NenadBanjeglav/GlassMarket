"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

const Search = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const query = searchParams.get("q");

  const [search, setSearch] = useState(query || "");
  const [isOpen, setIsopen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsopen(false);
        setSearch("");
      }
    };

    setIsopen(false);

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [pathname]);

  useEffect(() => {
    const delayDebouncFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "name",
          value: search,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["name", "type"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebouncFn);
  }, [search, pathname, router, searchParams, query]);

  return (
    <div className="relative flex-1" ref={searchContainerRef}>
      <Input
        type="text"
        placeholder="Pretraži sve proizvode"
        value={search}
        className="w-full rounded-md border-gray-200 px-4 py-2.5 outline-none placeholder:text-xs focus-visible:border-darkBlue"
        onChange={(e) => {
          setSearch(e.target.value);

          if (!isOpen) setIsopen(true);
          if (e.target.value === "" && isOpen) setIsopen(false);
        }}
      />
    </div>
  );
};

export default Search;
