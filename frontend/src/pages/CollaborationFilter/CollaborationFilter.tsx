// Components Imports
import { RecsList, RecsItem } from "@/components/recs-list";

// API Imports
import { useCollaborationFilter } from "@/hooks/api-recommender";
import { useProductsQuery } from "@/hooks/api-wpadmin";

// Utils Imports
import { getJsonProduct } from "@/utils";

// MUI Imports
import { Container } from "@mui/material";

export function CollaborationFilter() {
  const product = getJsonProduct();

  const cfQuery = useCollaborationFilter({
    shop_product_id: String(product?.id),
    top_k: 10,
  });

  const productsQuery = useProductsQuery(
    cfQuery.data?.data?.map((item) => {
      return Number(item.shop_product_id);
    }) || []
  );

  // API pending
  if (cfQuery.isPending) {
    return null;
  }

  if (productsQuery.isPending) {
    return null;
  }

  // API failed
  if (cfQuery.isError) {
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
            intersectionEventName="WarpDrivenCFView"
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
        <RecsList title="Customers who viewed this item also viewed">
          {itemNodeList}
        </RecsList>
      </Container>
    );
  })();

  return <>{mainNode}</>;
}
