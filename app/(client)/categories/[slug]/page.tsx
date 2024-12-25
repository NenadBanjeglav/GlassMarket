import Container from "@/components/Container";
import ProductGrid from "@/components/ProductGrid";
import VolumeSelector from "@/components/VolumeSelector";

import { getAllCategories, getProductsByCategory } from "@/sanity/helpers";
import React from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

const CategoryPage = async ({ params }: Props) => {
  const { slug } = await params;
  const products = await getProductsByCategory(slug);
  const categories = await getAllCategories();
  const category = categories.find((cat) => cat.slug?.current === slug);
  const hasVolumeProducts = products.some((product) => product.volume! > 0);

  return (
    <main>
      <div className="flex flex-col items-center bg-gray-100">
        <Container className="mt-3 w-full rounded-lg bg-white p-8 shadow-md">
          <div className="pb-10">
            <h2 className="text-center text-2xl font-semibold uppercase text-gray-600">
              Naša ponuda u kategoriji{" "}
              <span className="text-lightBlue">
                {slug
                  .split("-")
                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(" ")}
              </span>
            </h2>
            <p className="text-center text-gray-500">{category?.description}</p>
          </div>

          <div className="py-8">
            {hasVolumeProducts && (
              <div className="pb-4">
                <VolumeSelector />
              </div>
            )}
            <ProductGrid products={products} />
          </div>
        </Container>
      </div>
    </main>
  );
};

export default CategoryPage;
