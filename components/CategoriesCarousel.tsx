"use client";

import { Category } from "@/sanity.types";
import React from "react";

import Container from "./Container";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface Props {
  categories: Category[];
}

const CategoriesCarousel = ({ categories }: Props) => {
  console.log(categories);
  return (
    <Container className="py-16">
      <h2 className="text-center text-2xl font-semibold uppercase text-gray-600 md:text-left">
        Istražite <span className="text-lightBlue">Kategorije</span>
      </h2>
      <p className="text-center text-gray-500 md:text-left">
        Otkrijte širok asortiman proizvoda po kategorijama.
      </p>
      <Carousel
        className="relative mx-auto mb-10 w-full max-w-7xl md:my-10"
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
      >
        <CarouselContent className="-ml-0 gap-8">
          {categories.map((cat) => (
            <CarouselItem
              key={cat._id}
              className="group w-full overflow-hidden rounded-lg border border-gray-300 pl-0 text-sm sm:basis-1/2 md:basis-1/3"
            >
              <div className="relative overflow-hidden border-b border-b-gray-300">
                {cat.image && (
                  <Link
                    href={`/categories/${cat.slug?.current}`}
                    className="block"
                  >
                    <Image
                      src={urlFor(cat.image).url()}
                      alt="Product Image"
                      height={500}
                      width={500}
                      loading="lazy"
                      className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <p className="text-2xl font-semibold capitalize text-white">
                        {cat.title}
                      </p>
                    </div>
                  </Link>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2" />
        <CarouselNext className="absolute right-2" />
      </Carousel>
    </Container>
  );
};

export default CategoriesCarousel;
