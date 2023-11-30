// React Imports
import { useMemo } from "react";
import ReactDOM from "react-dom";

// Components Imports
import { RecsList, RecsItem } from "@/components/recs-list";

// API Imports
import { useVisual } from "@/hooks/api-visual";
import { useProdcuts } from "@/hooks";

// Utils Imports
import { getJsonProduct } from "@/utils";

export function DetailCF() {
  const product = getJsonProduct();

  // API Hooks
  const vsQuery = useVisual({
    shop_variant_id: product?.variants?.[0].id || "",
    top_k: 4,
  });

  const queries = useProdcuts(
    vsQuery.data?.map((item) => {
      return item.handle;
    }) || []
  );

  const mainNode = useMemo(() => {
    const el = document.getElementById("warpdriven-recs-vsr");
    if (!el) return null;

    const itemNodeList = queries
      .filter(({ data }) => {
        return [
          data,
          Array.isArray(data?.products),
          data?.products.length,
          !data?.products[0].sold_out,
        ].every(Boolean);
      })
      .map(({ data }) => {
        const product = data?.products[0];
        if (!product) return null;

        return (
          <RecsItem
            key={product.handle}
            product={product}
            suffixSearch="vsr_click"
            intersectionEventName="WarpDrivenVSRView"
          />
        );
      });

    return ReactDOM.createPortal(
      <RecsList title="WarpDriven">{itemNodeList}</RecsList>,
      el
    );
  }, [queries]);

  return <>{mainNode}</>;
}
