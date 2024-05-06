import { Container } from "@mui/material";
import { usePostHog } from "posthog-js/react";
import { RecsList, RecsItem } from "@/components/recs-list";
import { useRecommendations } from "@/hooks/api-recommender";
import { useProductsQuery } from "@/hooks/api-wpadmin";
import { getJsonProduct } from "@/utils";

export function VisualSimilar() {
  const product = getJsonProduct();

  const posthog = usePostHog();

  const vsrQuery = useRecommendations({
    shop_product_id: String(product?.id),
    user_id: posthog.get_distinct_id(),
    rec_number: 21,
    top_k: 20,
  });

  const productsQuery = useProductsQuery(
    vsrQuery.data?.map?.((item) => {
      return Number(item.shop_product_id);
    }) || [],
  );

  if (vsrQuery.isPending) {
    return null;
  }

  if (productsQuery.isPending) {
    return null;
  }

  if (vsrQuery.isError) {
    return null;
  }

  if (productsQuery.isError) {
    return null;
  }

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

  if (itemNodeList.length) {
    return (
      <Container>
        <RecsList title="Visually Similar Recommendations">
          {itemNodeList}
        </RecsList>
      </Container>
    );
  }

  return null;
}
