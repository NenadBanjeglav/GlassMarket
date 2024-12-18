import { Truck, ThumbsUp, Banknote, Recycle } from "lucide-react";

import React from "react";
import Container from "./Container";

const FeaturesBanner = () => {
  return (
    <div className="border-y bg-red-700">
      <Container>
        <div className=" flex flex-col items-center justify-between gap-2.5 py-5  sm:flex-row">
          <div className=" flex flex-col items-center gap-2 text-sm text-white">
            <Truck />
            <p>Dostava na adresu</p>
          </div>
          <div className=" flex flex-col items-center gap-2 text-sm text-white">
            <ThumbsUp />
            <p>Garancija na kvalitet</p>
          </div>
          <div className=" flex flex-col items-center gap-2 text-sm text-white">
            <Banknote />
            <p>Najbolje cene</p>
          </div>
          <div className=" flex flex-col items-center gap-2 text-sm text-white">
            <Recycle />
            <p>Prihvatamo reklamacije</p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FeaturesBanner;
