import CategorySelector from "@/components/CategorySelector";
import Container from "@/components/Container";
import ProductGrid from "@/components/ProductGrid";
import VolumeSelector from "@/components/VolumeSelector";
import { getAllCategories, getAllProducts } from "@/sanity/helpers";
import React from "react";

interface SearchParams {
  category?: string;
  volume?: string; // Volume is received as a string from URL params
}

const StorePage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const params = await searchParams;
  const categorySlug = params?.category;
  const volumeSlug = params?.volume ? parseInt(params.volume || "") : undefined;
  const categories = await getAllCategories();
  const products = await getAllProducts(categorySlug, volumeSlug);

  return (
    <Container className="py-16">
      <div className="pb-10">
        <h2 className="text-center text-2xl font-semibold text-gray-600">
          Istražite Našu Ponudu{" "}
          <span className="text-lightBlue">Staklene Ambalaže</span>
        </h2>
        <p className="text-center text-gray-500">
          Pronađite boce, tegle i zatvarače različitih veličina i modela –
          idealno rešenje za vaše potrebe pakovanja.
        </p>
      </div>
      <div className="flex flex-col gap-4 pb-4 md:flex-row">
        <CategorySelector categories={categories} />
        <VolumeSelector />
      </div>
      <ProductGrid products={products} />
    </Container>
  );
};

export default StorePage;
