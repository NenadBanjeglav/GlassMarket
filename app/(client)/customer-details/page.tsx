"use client";

import CheckoutSteps from "@/components/CheckoutSteps";
import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import Loader from "@/components/Loader";
import OrderForm from "@/components/OrderForm";
import userCartStore from "@/store";
import React, { useEffect, useState } from "react";

const CustomerDetails = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const { getGroupedItems } = userCartStore();
  const groupedItems = getGroupedItems();

  if (!isClient) {
    return <Loader />;
  }
  return (
    <main className="bg-white">
      <Container>
        <div className="pt-10">
          <h2 className="text-center text-2xl font-semibold uppercase text-gray-600">
            Podaci <span className="text-lightBlue">o kupcu</span>
          </h2>
          <p className="text-center text-gray-500">
            Dobrodošli na korak do završetka vaše kupovine! Proverite i unesite
            svoje podatke kako biste osigurali brzu i sigurnu isporuku vaših
            staklenih rešenja. Vaša korpa je spremna – savršeni proizvodi čekaju
            na vas!
          </p>
        </div>

        <CheckoutSteps current={1} />
        {groupedItems.length ? (
          <OrderForm orderItems={groupedItems} />
        ) : (
          <EmptyCart />
        )}
      </Container>
    </main>
  );
};

export default CustomerDetails;
