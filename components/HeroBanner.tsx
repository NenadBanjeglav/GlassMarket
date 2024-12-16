"use client";

import { HERO_QUERYResult } from "@/sanity.types";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "./ui/button";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";

const HeroBanner = ({ heroes }: { heroes: HERO_QUERYResult }) => {
  return (
    <Carousel
      className="relative mx-auto my-10 w-full max-w-screen-xl"
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent>
        {heroes.map((hero) => (
          <CarouselItem key={hero._id}>
            <Card>
              <CardContent className="">
                <div className="flex h-[400px]  flex-col items-center justify-center md:h-[500px] md:flex-row">
                  <div className="flex flex-1 flex-col items-center gap-3 p-6 md:items-start md:gap-4 md:px-12">
                    <Badge
                      variant="secondary"
                      className=" w-fit uppercase text-darkBlue"
                    >
                      {hero.badge}
                    </Badge>
                    <h2 className=" text-center text-2xl font-bold  tracking-tight md:text-start md:text-3xl lg:text-4xl">
                      {hero.title}
                    </h2>
                    <p className="mt-2 text-center text-muted-foreground md:mt-4 md:text-start">
                      {hero.description}
                    </p>

                    <Button
                      className=" flex w-fit items-center justify-center rounded-lg bg-blue-600 px-6 py-4 font-semibold text-white transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      variant="default"
                      asChild
                    >
                      <Link href={`#products`}>Započni Kupovinu</Link>
                    </Button>
                  </div>
                  {hero.image && (
                    <div className="relative hidden h-auto w-full items-center justify-center py-2 md:flex md:w-1/2">
                      <Image
                        src={urlFor(hero.image).url()}
                        alt="Hero Image"
                        width={500}
                        height={500}
                        className="hoverEffect h-full overflow-hidden object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2" />
      <CarouselNext className="absolute right-2" />
    </Carousel>
  );
};

export default HeroBanner;
