import HeroBanner from "@/components/HeroBanner";
import ProductsList from "@/components/ProductList";

import { getAllCategories, getAllProducts, getHero } from "@/sanity/helpers";

export default async function Home(params: {
  searchParams?: Promise<{ category?: string }>;
}) {
  const heroes = await getHero();
  const categorySlug = (await params.searchParams)?.category;
  const products = await getAllProducts(categorySlug);
  const categories = await getAllCategories();

  return (
    <div>
      <HeroBanner heroes={heroes} />
      <section id="products">
        <ProductsList
          products={products}
          title={true}
          categories={categories}
        />
      </section>
    </div>
  );
}
