// Components Imports
import { RecsList, RecsItem } from "@/components/recs-list";

// API Imports
import { useVisual } from "@/hooks/api-visual";
import { useProducts } from "@/hooks/api-wpadmin";

// Utils Imports
import { getJsonProduct, getJsonSettings } from "@/utils";

// MUI Imports
import { Container } from "@mui/material";

export function ProductList() {
  const product = getJsonProduct();
  const settings = getJsonSettings();

  const vsrQuery = useVisual({
    shop_variant_id: String(product?.variations?.[0] || product?.id),
    top_k: 10,
  });

  const queries = useProducts(
    vsrQuery.data?.map((item) => {
      return item.product_id;
    }) || []
  );

  // API pending
  if (vsrQuery.isPending) {
    return null;
  }

  // API failed
  if (vsrQuery.isError) {
    return null;
  }

  // Checking settings
  if (!settings) {
    return null;
  }

  // Tese mode enable
  if (settings.wd_is_test_mode === "on") {
    switch (new URLSearchParams(window.location.search).get("wd_demo")) {
      case "true":
        break;
      default:
        return null;
    }
  }

  const mainNode = (() => {
    const itemNodeList = queries
      .filter(({ data }) => {
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
      .map(({ data }) => {
        if (!data) return null;

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
        <RecsList title="Visual Similar Recommendation">
          {itemNodeList}
        </RecsList>
      </Container>
    );
  })();

  return <>{mainNode}</>;
}
