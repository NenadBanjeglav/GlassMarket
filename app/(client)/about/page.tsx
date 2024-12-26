import Container from "@/components/Container";
import Image from "next/image";
import React from "react";
import razdelnikLogo from "@/public/glass-market-rezdelnik.png";
import Link from "next/link";

const AboutPage = () => {
  return (
    <main className="bg-white">
      <Container>
        <div className="py-10">
          <div className=" flex items-center justify-center">
            <Link href="/">
              <Image
                src="/logo.jpg"
                alt="logo"
                width={150}
                height={100}
                priority
              />
            </Link>
          </div>

          <p className="text-center text-gray-500">
            Vaš partner za kvalitetnu i pristupačnu staklenu ambalažu
          </p>

          <h2 className="pt-10 text-center text-2xl font-semibold uppercase text-gray-600">
            O nama
          </h2>
          <p className="text-center text-red-700">
            Firma LIKA PROMET DOO osnovana je 01.07.1996. godine.
          </p>
          <p className="text-center text-gray-500">
            Delatnost kojima se bavi su usluge transporta u domaćem i
            međunarodnom transportu. Sa godinama stečenog znanja i iskustva i uz
            podršku sopstvenih snaga krećemo se napred za još veći kvalitet
            naših usluga.
          </p>
          <div className="my-10 flex items-center justify-center">
            <Image src={razdelnikLogo} alt="logo" width={150} height={80} />
          </div>
          <p className="mb-10 text-center text-red-700">
            U cilju proširenja poslovanja, registrovan je ogranak GLASS MARKET,
            koji se bavi uvozom i prodajom staklene ambalaže.
          </p>
          <p className="text-center text-gray-500">
            U PONUDI RASPOLAŽEMO SA RAZNIM MODELIMA: BOCA, TEGLI, TE RAZLIČITIM
            VRSTAMA ČEPOVA, POKLOPACA, PVC KAPICA, A U CILJU ZATVARANJA I
            PAKOVANJA PONUĐENE AMBALAŽE.
          </p>
          <div className="my-10 flex items-center justify-center">
            <Link
              href="/store"
              className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Započnite kupovinu
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default AboutPage;
