import AddToCartButton from "@/components/AddToCartButton";
import Container from "@/components/Container";
import PriceView from "@/components/PriceView";
import ProductGrid from "@/components/ProductGrid";
import { Separator } from "@/components/ui/separator";
import { getProductBySlug } from "@/sanity/helpers";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";

const ProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  return (
    <div>
      <Container className="flex flex-col gap-10 py-10 md:flex-row">
        {product?.image && (
          <div className="group w-full overflow-hidden rounded-md border border-darkBlue/20 shadow-md md:w-1/2">
            <Image
              src={urlFor(product.image).url()}
              alt="product image"
              width={500}
              height={500}
              className="hoverEffect max-h-[450px] w-full overflow-hidden rounded-md object-contain object-bottom group-hover:scale-110"
            />
          </div>
        )}
        <div className="flex w-full flex-col gap-5 md:w-1/2">
          <div>
            <p className="mb-2 text-4xl font-bold">{product?.name}</p>
          </div>
          {product?.price && (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            <PriceView product={product} className="text-lg font-bold" />
          )}

          {product?.volume && (
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-800">Zapremina:</p>
              <p className="text-gray-500">{product?.volume} ml</p>
            </div>
          )}
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-800">Visina:</p>
            <p className="text-gray-500">{product?.height} mm</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-800">Širina:</p>
            <p className="text-gray-500">{product?.width} mm</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-800">Težina:</p>
            <p className="text-gray-500">{product?.weight} g</p>
          </div>

          {product?.stock && (
            <p className="w-24 rounded-lg bg-green-100 py-2.5 text-center text-sm font-semibold text-green-600">
              Na lageru
            </p>
          )}

          <p className="text-sm tracking-wide text-gray-600">
            {product?.description}
          </p>

          {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            product && <AddToCartButton product={product} />
          }
          <div className="flex items-center gap-5">
            <div className="hoverEffect rounded-md border border-darkBlue/20 p-3 text-center hover:border-darkBlue">
              <p className="text-base font-semibold text-black">10% POPUST</p>
              <p className="text-sm text-gray-500">
                Na Porudzbine Preko 50000 RSD
              </p>
            </div>
            <div className="hoverEffect rounded-md border border-darkBlue/20 p-3 text-center hover:border-darkBlue">
              <p className="text-base font-semibold text-black">15% POPUST</p>
              <p className="text-sm text-gray-500">
                Na Porudzbine Preko 125000 RSD
              </p>
            </div>
            <div className="hoverEffect rounded-md border border-darkBlue/20 p-3 text-center hover:border-darkBlue">
              <p className="text-base font-semibold text-black">20% POPUST</p>
              <p className="text-sm text-gray-500">
                Na Porudzbine Preko 200000 RSD
              </p>
            </div>
          </div>
        </div>
      </Container>
      <Separator />
      {product?.relatedCaps && (
        <Container>
          <section id="products" className="pt-10">
            <div className="pb-10">
              <h2 className="text-2xl font-semibold text-gray-600">
                Povezani <span className="text-lightBlue">Proizvodi </span>:
              </h2>
            </div>
            <ProductGrid products={product.relatedCaps} />
          </section>
        </Container>
      )}
    </div>
  );
};

export default ProductPage;
