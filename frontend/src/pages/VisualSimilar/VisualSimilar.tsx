// Components Imports
import { RecsList, RecsItem } from "@/components/recs-list";

// API Imports
import { useVisual } from "@/hooks/api-visual";
import { useProductsQuery } from "@/hooks/api-wpadmin";

// Utils Imports
import { getJsonProduct } from "@/utils";

// MUI Imports
import { Container } from "@mui/material";

export function VisualSimilar() {
  const product = getJsonProduct();

  const vsrQuery = useVisual({
    shop_variant_id: String(product?.variations?.[0] || product?.id),
    top_k: 10,
  });

  const productsQuery = useProductsQuery(
    vsrQuery.data?.map((item) => {
      return Number(item.product_id);
    }) || []
  );

  // API pending
  if (vsrQuery.isPending) {
    return null;
  }

  if (productsQuery.isPending) {
    return null;
  }

  // API failed
  if (vsrQuery.isError) {
    return null;
  }

  if (productsQuery.isError) {
    return null;
  }

  const mainNode = (() => {
    const itemNodeList = Object.values(productsQuery.data)
      .filter((data) => {
        return [
          data,
          data?.product_id,
          data?.product_title,
          data?.product_price,
          data?.productlink,
          data?.main_image_url,
          typeof data?.product_title === "string",
          typeof data?.product_price === "string",
          typeof data?.productlink === "string",
          typeof data?.main_image_url === "string",
        ].every(Boolean);
      })
      .map((data) => {
        return (
          <RecsItem
            key={data.product_id}
            product={data}
            suffixSearch="vsr_click"
            intersectionEventName="WarpDrivenVSRView"
          ></RecsItem>
        );
      });

    // No products
    if (!itemNodeList.length) {
      return null;
    }

    // Has products
    return (
      <Container>
        <RecsList title="Visually Similar Recommendations">
          {itemNodeList}
        </RecsList>
      </Container>
    );
  })();

  return <>{mainNode}</>;
}
