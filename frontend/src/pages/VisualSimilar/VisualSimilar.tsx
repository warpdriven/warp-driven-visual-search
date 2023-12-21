// Components Imports
import { RecsList, RecsItem } from "@/components/recs-list";

// API Imports
import { useVisual } from "@/hooks/api-visual";
import { useProducts, useSettingsQuery } from "@/hooks/api-wpadmin";

// Utils Imports
import { getJsonProduct } from "@/utils";

// React Imports
import React from "react";

// MUI Imports
import { Container } from "@mui/material";

export function VisualSimilar() {
  const product = getJsonProduct();

  const vsrQuery = useVisual({
    shop_variant_id: String(product?.variations?.[0] || ""),
    top_k: 10,
  });

  const queries = useProducts(
    vsrQuery.data?.map((item) => {
      return item.product_id;
    }) || []
  );

  const query = useSettingsQuery();

  const mainNode = React.useMemo(() => {
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

    // API pending & failed
    if (!query.data) {
      return <></>;
    }

    // Tese mode enable
    if (query.data.wd_is_test_mode === "on") {
      const searchParams = new URLSearchParams(window.location.search);
      const wd_demo = searchParams.get("wd_demo");

      switch (wd_demo) {
        case "true":
          break;
        default:
          return <></>;
      }
    }

    // No products
    if (!itemNodeList.length) {
      return null;
    }

    // Has products
    return (
      <>
        <Container>
          <RecsList title="Visual Similar Recommendation">
            {itemNodeList}
          </RecsList>
        </Container>
      </>
    );
  }, [queries, query.data]);

  return <>{mainNode}</>;
}
