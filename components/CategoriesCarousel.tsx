"use client";

import { Category } from "@/sanity.types";
import React from "react";

import Container from "./Container";
import Image from "next/image";
import razdelnikLogo from "@/public/glass-market-rezdelnik.png";
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
  return (
    <Container>
      <div className="flex items-center justify-center">
        <Image src={razdelnikLogo} alt="logo" width={150} height={80} />
      </div>
      <div className="py-10">
        <h2 className="text-center text-2xl font-semibold text-gray-600">
          UVOZ I PRODAJA{" "}
          <span className="text-lightBlue">STAKLENE AMBALAŽE</span>
        </h2>
        <p className="text-center text-gray-500">
          U našoj ponudi možete pronaći širok spektar ambalažnih rešenja,
          uključujući različite modele boca i tegli, kao i raznovrsne vrste
          zatvarača: čepove, poklopce i PVC kapice. Naš asortiman je pažljivo
          osmišljen kako bi omogućio optimalno zatvaranje i pakovanje odabrane
          ambalaže, u skladu sa vašim specifičnim potrebama.
        </p>
      </div>
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
