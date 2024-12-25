import React, { Suspense } from "react";
import { ChartsLoadingContainer, StatsLoadingContainer } from "./Loading";
import StatsContainer from "@/components/StatsContainer";
import ChartsContainer from "@/components/ChartsContainer";

const AdminPage = () => {
  return (
    <>
      <Suspense fallback={<StatsLoadingContainer />}>
        <StatsContainer />
      </Suspense>
      <Suspense fallback={<ChartsLoadingContainer />}>
        <ChartsContainer />
      </Suspense>
    </>
  );
};

export default AdminPage;
