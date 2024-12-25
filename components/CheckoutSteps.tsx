import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const CheckoutSteps = ({ current = 0 }) => {
  return (
    <div className="mx-auto my-10 flex max-w-3xl flex-col items-center justify-between space-x-2 space-y-2 md:flex-row">
      {["Korpa", "Plaćanje"].map((step, index) => (
        <React.Fragment key={step}>
          <Link
            href={step === "Korpa" ? "/cart" : "/customer-details"}
            className={cn(
              `p-2 w-56 text-center text-sm rounded-full border text-darkText font-semibold`,
              index === current ? `bg-gray-100` : ""
            )}
          >
            {step}
          </Link>
          {step !== "Plaćanje" && (
            <hr className="mx-2 w-16 border-t border-gray-300" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CheckoutSteps;
