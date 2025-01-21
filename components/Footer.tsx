import {
  ClerkLoaded,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

const Footer = async () => {
  return (
    <footer className=" bg-gray-50 text-gray-600">
      <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-12 md:grid-cols-3">
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

        {/* Support Section */}
        <div>
          <h3 className="text-center text-sm font-semibold uppercase text-gray-800 md:text-left">
            Podrška
          </h3>
          <ul className="mt-4 flex flex-col items-center space-y-2 md:items-start">
            <li>
              <Link
                href="/how-to-order"
                className="hoverEffect hover:text-red-700"
              >
                Kako naručiti
              </Link>
            </li>
            <li>
              <Link
                href="/payment-options"
                className="hoverEffect hover:text-red-700"
              >
                Način plaćanja
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hoverEffect hover:text-red-700">
                Reklamacije
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hoverEffect hover:text-red-700">
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
              <Link href="/about" className="hoverEffect hover:text-red-700">
                O nama
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hoverEffect hover:text-red-700">
                Kontakt
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto max-w-7xl p-6  text-center text-sm">
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-lightBlue">Glass</span>
        <span className="text-red-700">Market</span>. All rights reserved.
        <div className="mx-auto mt-4 flex max-w-sm items-center justify-center">
          <ClerkLoaded>
            <SignedIn>
              <div className="hoverEffect flex items-center gap-1 rounded-md border border-gray-200 px-2 py-1 shadow-md hover:shadow-none">
                <UserButton />
              </div>
            </SignedIn>
            <SignedOut>
              <div className="hoverEffect  flex items-center gap-1 rounded-md border border-gray-200 px-2 py-1 shadow-md hover:shadow-none">
                <SignInButton mode="modal">
                  <div className="flex gap-1">
                    <span className="text-xs font-thin md:inline-block">
                      Admin
                    </span>
                  </div>
                </SignInButton>
              </div>
            </SignedOut>
          </ClerkLoaded>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
