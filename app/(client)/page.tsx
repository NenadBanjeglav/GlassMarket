import HeroBanner from "@/components/HeroBanner";
import ProductsList from "@/components/ProductList";

import { getAllCategories, getAllProducts, getHero } from "@/sanity/helpers";

export default async function Home({
  searchParams,
}: {
  searchParams: { category?: string | undefined };
}) {
  const params = await searchParams;
  const categorySlug = params.category;
  const heroes = await getHero();
  const products = await getAllProducts(categorySlug);
  const categories = await getAllCategories();

  console.log(params);

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
