import { getAllCategories } from "@/sanity/helpers";
import Link from "next/link";

const Footer = async () => {
  const categories = await getAllCategories();

  return (
    <footer className=" bg-gray-50 text-gray-600">
      <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-12 md:grid-cols-4">
        {/* Branding Section */}
        <div className="col-span-1">
          <Link href="/">
            <h2 className="text-center text-xl font-bold text-gray-800 md:text-left">
              {" "}
              <span className="text-lightBlue">Glass</span>
              <span className="text-red-700">Market</span>
            </h2>
          </Link>
          <p className="mt-2 text-center text-sm md:text-left">
            Pružamo visokokvalitetna rešenja za staklenu ambalažu za sve vaše
            potrebe.
          </p>
        </div>

        {/* Solutions Section */}
        <div>
          <h3 className="text-center text-sm font-semibold uppercase text-gray-800 md:text-left">
            Kategorije
          </h3>
          <ul className="mt-4 flex flex-col items-center space-y-2 md:items-start">
            <li>
              <Link href={`/store`} className=" hoverEffect hover:text-red-700">
                Svi Proizvodi
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat._id}>
                <Link
                  href={`/categories/${cat.slug?.current}`}
                  className=" hoverEffect hover:text-red-700"
                >
                  {cat.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="text-center text-sm font-semibold uppercase text-gray-800 md:text-left">
            Podrška
          </h3>
          <ul className="mt-4 flex flex-col items-center space-y-2 md:items-start">
            <li>
              <Link href="#" className="hoverEffect hover:text-red-700">
                Kako naručiti
              </Link>
            </li>
            <li>
              <Link href="#" className="hoverEffect hover:text-red-700">
                Način plaćanja
              </Link>
            </li>
            <li>
              <Link href="#" className="hoverEffect hover:text-red-700">
                Reklamacije
              </Link>
            </li>
            <li>
              <Link href="#" className="hoverEffect hover:text-red-700">
                Način i cena dostave
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h3 className="text-center text-sm font-semibold uppercase text-gray-800 md:text-left">
            Kompanija
          </h3>
          <ul className="mt-4 flex flex-col items-center space-y-2 md:items-start">
            <li>
              <Link href="#" className="hoverEffect hover:text-red-700">
                O nama
              </Link>
            </li>
            <li>
              <Link href="#" className="hoverEffect hover:text-red-700">
                Kontakt
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 py-6 text-center text-sm">
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-lightBlue">Glass</span>
        <span className="text-red-700">Market</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
