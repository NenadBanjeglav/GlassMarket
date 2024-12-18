"use client";

import React from "react";

import Container from "./Container";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Product } from "@/sanity.types";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

const CategoriesCarousel = ({ products }: Props) => {
  return (
    <Container>
      <Carousel
        className="relative mx-auto mb-10 w-full max-w-7xl md:my-10"
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
      >
        <CarouselContent className="-ml-0 gap-8">
          {products.map((pro) => (
            <CarouselItem
              key={pro._id}
              className="group w-full overflow-hidden rounded-lg border border-gray-300 pl-0 text-sm sm:basis-1/2 md:basis-1/4"
            >
              <ProductCard product={pro} />
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
