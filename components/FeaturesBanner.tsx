import { Truck, ThumbsUp, Banknote, Recycle } from "lucide-react";
import React from "react";
import Container from "./Container";

const FeaturesBanner = () => {
  return (
    <Container>
      <div className="grid grid-cols-1 gap-4 py-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-4 text-sm text-darkText shadow-sm">
          <Truck size={32} />
          <p>Dostava na adresu</p>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-4 text-sm text-darkText shadow-sm">
          <ThumbsUp size={32} />
          <p>Garancija na kvalitet</p>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-4 text-sm text-darkText shadow-sm">
          <Banknote size={32} />
          <p>Najbolje cene</p>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-4 text-sm text-darkText shadow-sm">
          <Recycle size={32} />
          <p>Prihvatamo reklamacije</p>
        </div>
      </div>
    </Container>
  );
};

export default FeaturesBanner;
