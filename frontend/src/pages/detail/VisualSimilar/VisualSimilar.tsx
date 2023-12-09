// Components Imports
import { RecsList } from "@/components/recs-list";

// API Imports
import { useAllProducts } from "@/hooks/api-woo";

export function VisualSearch() {
  const allProductsQuery = useAllProducts();
  console.log(allProductsQuery.data);

  return (
    <>
      <RecsList title="Visual Similar Recommendation">
        {/* <RecsItem /> */}
        {null}
      </RecsList>
    </>
  );
}
