import Container from "@/components/Container";
import React from "react";

const HowToOrderPage = () => {
  return (
    <main className="bg-white">
      <Container>
        <div className=" bg-white p-6">
          <div>
            <h2 className="text-center text-2xl font-semibold uppercase text-lightBlue">
              Kako naručiti
            </h2>
            <p className="text-center text-gray-500">
              Jednostavan Vodič za Brzu i Sigurnu Porudžbinu
            </p>
          </div>
          <section className="my-20">
            <h2 className="mb-4 text-center text-2xl font-bold text-lightBlue">
              Kako izabrati artikal:
            </h2>
            <p className="mb-4 text-center text-gray-500">
              Na vrhu stranice ili na desnoj strani(na malim ekranima) nalazi se
              padajući meni sa kategorijama proizvoda. Odabirom neke od
              kategorija, otvara se stranica sa pripadajućim proizvodima.
              Ukoliko ne znate kojoj kategoriji pripada proizvod, upotrebite
              polje za pretragu koje se nalazi u gornjem delu sajta, u koje ćete
              upisati naziv. Kada izlistate grupu proizvoda koji vas interesuju,
              klikom na željeni artikal, dobićete sve potrebne informacije,
              detaljne opise i verodostojne slike odabranog proizvoda.
            </p>
            <p className="mb-4 text-center text-gray-500">
              Prilikom pregleda proizvoda, videćete dugme &quot;Dodaj u
              Korpu&quot; pomoću klika dodajete jedan primerak izabranog
              proizvoda u korpu i pojavljuju se &quot;+&quot; i &quot;-&quot;
              dugmici kojima korigujete kolicinu izabranog proizvoda.
            </p>
          </section>

          <section className="my-20">
            <h2 className="mb-4 text-center text-2xl font-bold text-lightBlue">
              Sadržaj korpe:
            </h2>
            <p className="text-center text-gray-500">
              Jednostavnim klikom na ikonicu korpe možete u svakom trenutku
              pregledati njen sadržaj. Odatle možete veoma lako brisati
              proizvode ili povećavati njihov broj.
            </p>
          </section>

          <section className="my-20">
            <h2 className="mb-4 text-center text-2xl font-bold text-lightBlue">
              Poručivanje proizvoda iz korpe:
            </h2>
            <p className="mb-4 text-center text-gray-500">
              Kada se odlučite za jedan ili više artikala, potrebno je samo da
              kliknete na dugme{" "}
              <span className="font-semibold">Nastavite sa Placanjem</span>.
              Nakon toga će se otvoriti stranica za zaključivanje kupovine.
              Ukoliko ste se predomislili u vezi sa kupovinom ili želite nešto
              da izmenite, jednostavno se možete vratiti na Vašu korpu.
            </p>
          </section>

          <section className="my-20">
            <h2 className="mb-4 text-center text-2xl font-bold text-lightBlue">
              Odabir načina plaćanja:
            </h2>
            <p className="mb-4 text-center text-gray-500">
              Možete odabrati jedan od dva načina plaćanja – plaćanje pouzećem i
              plaćanje preko računa.
            </p>
            <h3 className="mb-2 text-center text-lg font-bold text-lightBlue">
              1. Plaćanje preko računa
            </h3>
            <p className="mb-4 text-center text-gray-500">
              Svoju porudžbinu možete platiti direktnom uplatom na račun GLASS
              MARKET, žiro račun:{" "}
              <span className="font-semibold">220-139879-77</span>. Plaćanje
              možete izvršiti standardnom uplatom u bilo kojoj pošti ili banci,
              ili putem internet bankarstva.
            </p>
            <h3 className="mb-2 text-center text-lg font-bold text-lightBlue">
              2. Plaćanje pouzećem
            </h3>
            <p className="mb-4 text-center text-gray-500">
              Kod plaćanja pouzećem porudžbinu plaćate kuriru prilikom
              preuzimanja.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
};

export default HowToOrderPage;
