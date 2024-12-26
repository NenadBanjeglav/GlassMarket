import Container from "@/components/Container";
import React from "react";

const ShippingPage = () => {
  return (
    <main className="bg-white">
      <Container>
        <div className="bg-white p-6">
          <div>
            <h2 className="mb-4 text-center text-2xl font-bold text-lightBlue">
              NAČIN DOSTAVE
            </h2>
            <p className="mb-4 text-center text-gray-500">
              Naručene proizvode Vam šaljemo Bex kurirskom službom koja
              garantuje kvalitet i vreme isporuke.
            </p>
            <p className="mb-4 text-center text-gray-500">
              Isporuka je moguća na celoj teritoriji Srbije, a naručene
              proizvode dobijate naredni dan, a najkasnije za 3 radna dana,
              ukoliko ih naručite prethodnog dana pre 12h (vikend ne ulazi u
              satnicu roka isporuke).
            </p>
            <p className="mb-4 text-center text-gray-500">
              Roba poručena vikendom se obrađuje i šalje u ponedeljak.
            </p>
            <p className="text-center text-gray-500">
              Napomena: ukoliko kupac želi može sam da angažuje svoju brzu
              poštu.
            </p>
          </div>

          <div className="mt-8">
            <h2 className="mb-4 text-center text-2xl font-bold text-lightBlue">
              CENOVNIK DOSTAVE
            </h2>
            <a
              href="https://bexexpress.rs/cenovnik"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-4 inline-block w-full text-center text-blue-500 underline"
            >
              https://bexexpress.rs/cenovnik
            </a>

            <table className="mt-4 w-full border border-gray-200 text-gray-500">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">
                    MASA PAKETA
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    CENE SA PDV-om
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">
                    0,1 do 5 kg
                  </td>
                  <td className="border border-gray-300 px-4 py-2">700 RSD</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">
                    05 – 10 kg
                  </td>
                  <td className="border border-gray-300 px-4 py-2">800 RSD</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">
                    10 – 20 kg
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    1.000 RSD
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">
                    20 – 30 kg
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    1.200 RSD
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">
                    30 – 50 kg
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    2.000 RSD
                  </td>
                </tr>
              </tbody>
            </table>

            <p className="mt-4 text-gray-500">
              PREKO 50KG DOPLATA 35 DINARA PO KILOGRAMU
            </p>
            <p className="text-gray-500">PALETA (230-480kg) 8.300 RSD</p>
            <p className="mt-4 font-bold text-red-500">
              CENA PREVOZA NE ZAVISI OD BROJA KUTIJA VEC SE NAPLAĆUJE PO
              KILOGRAMIMA.
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default ShippingPage;
