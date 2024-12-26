import Container from "@/components/Container";
import React from "react";

const PaymentsPage = () => {
  return (
    <main className="bg-white">
      <Container>
        <div className="pt-10">
          <h2 className="text-center text-2xl font-semibold uppercase text-lightBlue">
            Način Plaćanja
          </h2>
          <p className="text-center text-gray-500">
            Odaberite način plaćanja koji vam najviše odgovara za sigurnu i brzu
            obradu vaše porudžbine.
          </p>
        </div>
        <div className="my-20">
          <section className="my-4 border-b pb-4">
            <h2 className="mb-2 text-center text-xl font-semibold text-lightBlue">
              1. Plaćanje preko računa
            </h2>
            <p className="mb-2 text-center text-gray-500">
              Svoju porudžbu možete platiti direktnom uplatom na račun GLASS
              MARKET, žiro račun:
              <span className="font-semibold"> 220-139879-77</span>. Plaćanje
              možete izvršiti standardnom uplatnicom u bilo kojoj pošti ili
              banci, ili putem Interneta ako imate Internet pristup svom računu
              (web banking).
            </p>
            <p className="text-center text-gray-500">
              <span className="text-center font-semibold">Roba se šalje</span>{" "}
              tek po izvršenoj uplati na račun
              <span className="text-center font-semibold"> 220-139879-77</span>.
            </p>
          </section>
          <section className=" my-4  pb-4">
            <h2 className="mb-2 text-center text-xl font-semibold text-lightBlue">
              2. Plaćanje pouzećem
            </h2>
            <p className="text-center text-gray-500">
              Kod plaćanja pouzećem porudžbu plaćate kuriru prilikom
              preuzimanja.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
};

export default PaymentsPage;
