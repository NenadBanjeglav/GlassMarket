import CategoriesCarousel from "@/components/CategoriesCarousel";
import HeroBanner from "@/components/HeroBanner";
import ProductCarousel from "@/components/ProductCarousel";

import {
  getHero,
  getMainCategories,
  getProductsNew,
  getProductsOnSale,
} from "@/sanity/helpers";
import Image from "next/image";
import razdelnikLogo from "@/public/glass-market-rezdelnik.png";
import Container from "@/components/Container";
import FeaturesBanner from "@/components/FeaturesBanner";

export default async function Home() {
  const heroes = await getHero();
  const productsSale = await getProductsOnSale();
  const categories = await getMainCategories();
  const productsNew = await getProductsNew();

  return (
    <main className="py-4">
      <HeroBanner heroes={heroes} />
      <Container>
        <div className="py-10">
          <h2 className="text-center text-2xl font-semibold text-gray-600">
            UVOZ I PRODAJA{" "}
            <span className="text-lightBlue">STAKLENE AMBALAŽE</span>
          </h2>
          <p className="text-center text-gray-500">
            U našoj ponudi možete pronaći širok spektar ambalažnih rešenja,
            uključujući različite modele boca i tegli, kao i razne vrste
            zatvarača: čepove, poklopce i PVC kapice. Naš asortiman je pažljivo
            osmišljen kako bi omogućio optimalno zatvaranje i pakovanje odabrane
            ambalaže, u skladu sa vašim specifičnim potrebama.
          </p>
        </div>
      </Container>
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
            <ProductCarousel
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              products={productsSale}
            />
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

            <ProductCarousel
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              products={productsNew}
            />
          </Container>
        </section>
      )}
    </main>
  );
}
