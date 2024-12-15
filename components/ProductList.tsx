import { Category, Product } from "@/sanity.types";
import React from "react";

import Container from "./Container";
import Categories from "./Categories";
import ProductCard from "./ProductCard";

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
              Naša Ponuda{" "}
              <span className="text-lightBlue">Staklene Ambalaže</span>{" "}
              poklopaca i cepova
            </h2>
            <p className="text-sm font-thin text-gray-500">
              Pronađite širok izbor boca, tegli i poklopaca za sve vaše potrebe
              – praktična rešenja za svaku namenu!
            </p>
          </div>
        )}
        {categories && <Categories categories={categories} />}
        {/* <ProductGrid products={products} /> */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ProductsList;
