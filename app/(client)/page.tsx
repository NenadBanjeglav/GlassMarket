import CategoriesCarousel from "@/components/CategoriesCarousel";
import HeroBanner from "@/components/HeroBanner";
import ProductCarousel from "@/components/ProductCarousel";

import {
  getAllCategories,
  getHero,
  getProductsNew,
  getProductsOnSale,
} from "@/sanity/helpers";
import Image from "next/image";
import razdelnikLogo from "@/public/glass-market-rezdelnik.png";
import Container from "@/components/Container";
import FeaturesBanner from "@/components/FeaturesBanner";

// interface SearchParams {
//   category?: string;
//   volume?: string; // Volume is received as a string from URL params
// }

export default async function Home() {
  // const searchParams = await params.searchParams;
  // // const categorySlug = searchParams?.category;
  // // const volumeSlug = searchParams?.volume
  // //   ? parseInt(searchParams.volume)
  // //   : undefined;

  const heroes = await getHero();

  const productsSale = await getProductsOnSale();
  const categories = await getAllCategories();
  const productsNew = await getProductsNew();

  return (
    <div>
      <HeroBanner heroes={heroes} />
      <FeaturesBanner />
      <CategoriesCarousel categories={categories} />

      {productsSale.length > 0 && (
        <section>
          <Container>
            <div className="flex items-center justify-center">
              <Image src={razdelnikLogo} alt="logo" width={150} height={80} />
            </div>
            <div className="py-10">
              <h2 className="text-center text-2xl font-semibold uppercase text-gray-600">
                Proizvodi na <span className="text-red-700">AKCIJI</span> – Ne
                Propustite Najbolje Ponude!
              </h2>
              <p className="text-center text-gray-500">
                Istražite našu pažljivo odabranu ponudu proizvoda na akciji.
                Iskoristite specijalne popuste i nabavite omiljene proizvode po
                sniženim cenama. Ponuda traje dok traju zalihe!
              </p>
            </div>
            <ProductCarousel products={productsSale} />
          </Container>
        </section>
      )}

      {productsNew.length > 0 && (
        <section>
          <Container>
            <div className="flex items-center justify-center">
              <Image src={razdelnikLogo} alt="logo" width={150} height={80} />
            </div>
            <div className="py-10">
              <h2 className="text-center text-2xl font-semibold uppercase text-gray-600">
                <span className="text-red-700">Najnoviji</span> Proizvodi –
                Istražite Naše Novitete!
              </h2>
              <p className="text-center text-gray-500">
                Otkrijte našu najnoviju ponudu proizvoda. Uvek pratimo trendove
                i dodajemo nove artikle koji će unaprediti vašu ponudu. Budite
                prvi koji će isprobati naše najnovije proizvode i osigurajte ih
                dok su još dostupni!
              </p>
            </div>
            <ProductCarousel products={productsNew} />
          </Container>
        </section>
      )}

      {/* <section id="products">
        <ProductsList
          products={products}
          title={true}
          categories={categories}
        />
      </section> */}
    </div>
  );
}
