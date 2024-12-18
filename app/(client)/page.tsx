import CategoriesCarousel from "@/components/CategoriesCarousel";
import HeroBanner from "@/components/HeroBanner";
import ProductsList from "@/components/ProductList";
import { getAllCategories, getAllProducts, getHero } from "@/sanity/helpers";

interface SearchParams {
  category?: string;
  volume?: string; // Volume is received as a string from URL params
}

export default async function Home(params: {
  searchParams?: Promise<SearchParams>;
}) {
  const searchParams = await params.searchParams;
  const categorySlug = searchParams?.category;
  const volumeSlug = searchParams?.volume
    ? parseInt(searchParams.volume)
    : undefined;

  const heroes = await getHero();

  const products = await getAllProducts(categorySlug, volumeSlug);
  const categories = await getAllCategories();

  return (
    <div>
      <HeroBanner heroes={heroes} />
      <CategoriesCarousel categories={categories} />
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
