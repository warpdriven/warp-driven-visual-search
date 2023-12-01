// React Imports
import React from "react";

// Components Imports
import { RecsItem, RecsList } from "@/components/recs-list";

// API Imports
import { useAllProducts } from "@/hooks/api-woo";

export function VisualSearch() {
  const allProductsQuery = useAllProducts();
  console.log(allProductsQuery.data);

  return (
    <>
      <RecsList title="Visual Similar Recommendation">
        {/* <RecsItem /> */}
      </RecsList>
    </>
  );
}
