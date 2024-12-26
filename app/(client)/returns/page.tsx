import Container from "@/components/Container";
import React from "react";

const ReturnsPage = () => {
  return (
    <main className="bg-white">
      <Container>
        <div className="pt-10">
          <h2 className="text-center text-2xl font-semibold uppercase text-red-700">
            Reklamacije
          </h2>
          <p className="text-center text-gray-500">
            Vaša zadovoljstvo nam je prioritet – saznajte kako da prijavite
            reklamaciju ili povrat proizvoda.
          </p>
        </div>
        <div className="mx-auto my-20 max-w-4xl space-y-6 p-6">
          <section>
            <p className="text-center text-gray-500">
              Ukoliko prilikom preuzimanja pošiljke postoje vidna oštećenja na
              kutiji, potrošač je dužan da pogleda proizvod i ukoliko je oštećen
              da pozove Bex kurirsku službu na broj
              <span className="text-center font-semibold text-gray-500">
                {" "}
                011/6555-000
              </span>{" "}
              kako bi kurir napravio zapisnik i preuzeo oštećeni proizvod.
            </p>
          </section>

          <section>
            <p className="text-center text-gray-500">
              Po osnovu Zakona o zaštiti potrošača, ukoliko Vam se roba ne sviđa
              isto možete vratiti u roku od 15 dana od dana kupovine uz izjavu,
              original fiskalni račun, kao i fotokopiju lične karte. Transport
              ide na račun kupca.
            </p>
          </section>

          <section>
            <p className="text-center text-gray-500">
              Rok za prijavu reklamacije je{" "}
              <span className="text-center font-semibold text-gray-500">
                48 sati
              </span>
              . Posle navedenog perioda ne uvažavamo zahteve za reklamaciju.
            </p>
            <p className="text-center text-gray-500">
              Ukoliko je proizvod oštećen kupac treba da pozove kurirsku službu
              na broj
              <span className="text-center font-semibold text-gray-500">
                {" "}
                011/6555-000
              </span>
              , a ne kurira koji je dostavio robu. Kupac ne može da reklamira
              robu telefonom nego je potrebno da popuni{" "}
              <span className="text-center font-semibold text-gray-500">
                reklamacioni list
              </span>{" "}
              koji će nam proslediti
              <a
                href="mailto:info@glassmarket.rs
"
                className="text-red-700 underline"
              >
                {" "}
                e-mail-om
              </a>{" "}
              uz fiskalni račun, a koji možete preuzeti
              <a href="#" className="text-red-700 underline">
                {" "}
                ovde &gt;&gt;&gt;
              </a>
              .
            </p>
          </section>

          <section>
            <p className="text-center text-gray-500">
              Čim preuzmemo robu, izdaćemo reklamacioni list ili elektronskim
              putem poslati potvrdu o prijemu reklamacije.
            </p>
            <p className="text-center text-gray-500">
              Troškove povrata robe snosi kupac.
            </p>
          </section>

          <section>
            <p className="text-center text-gray-500">
              Po prijemu reklamacije Glass Market je dužan da bez odlaganja, a
              najkasnije u roku od osam dana od dana prijema reklamacije,
              pisanim ili elektronskim putem odgovori potrošaču na izjavljenu
              reklamaciju.
            </p>
            <p className="text-center text-gray-500">
              Odgovor na reklamaciju potrošača sadrži odluku da li prihvata
              reklamaciju, izjašnjenje o zahtevu potrošača i konkretan predlog i
              rok za rešavanje reklamacije.
            </p>
            <p className="text-center text-gray-500">
              Rok ne može da bude duži od 15 dana, od dana podnošenja
              reklamacije.
            </p>
          </section>

          <section>
            <p className="text-center text-gray-500">
              Ukoliko ima objektivnih razloga da ne može da se udovolji zahtevu
              potrošača u roku koji je dogovoren, dužni smo da navedemo rok u
              kom ćemo je rešiti i o tome obavestimo potrošača. Prvo ćemo
              pokušati da uklonimo nedostatak, ako ne možemo da uklonimo da
              zamenimo novim proizvodom.
            </p>
            <p className="text-center font-semibold text-gray-500">
              Potrošač nema pravo na reklamaciju ukoliko je nedostatak na robi
              nastao njegovom krivicom.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
};

export default ReturnsPage;
