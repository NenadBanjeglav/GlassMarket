import { Category, Product } from "@/sanity.types";
import React from "react";
import Container from "./Container";
import ProductGrid from "./ProductGrid";
import VolumeSelector from "./VolumeSelector";
import CategorySelector from "./CategorySelector";

interface Props {
  products: Product[];
  categories?: Category[];
  title?: boolean;
}

const ProductsList = ({ products, title, categories }: Props) => {
  return (
    <div className="pb-32">
      <Container>
        {title && (
          <div className="pb-10">
            <h2 className="text-2xl font-semibold text-gray-600">
              Naša ponuda{" "}
              <span className="text-lightBlue">staklene ambalaže</span>,{" "}
              poklopaca i čepova
            </h2>
            <p className="text-sm font-thin text-gray-500">
              Pronađite širok izbor boca, tegli i poklopaca za sve vaše potrebe
              – praktična rešenja za svaku namenu!
            </p>
          </div>
        )}
        <div className="mb-4 flex flex-col items-center gap-2 md:flex-row">
          {categories && <CategorySelector categories={categories} />}
          <VolumeSelector />
        </div>

        <ProductGrid products={products} />
      </Container>
    </div>
  );
};

export default ProductsList;
