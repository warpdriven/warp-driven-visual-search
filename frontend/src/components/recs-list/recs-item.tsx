// React Imports
import React from "react";

// Hooks Imports
import { useObserverIntersection } from "@/hooks";

// Posthog Imports
import posthog from "posthog-js";

// API Imports
import { Product } from "@/api/wpadmin/warpdriven_get_products";

export function RecsItem(props: RecsItemProps) {
  // ** Props
  const { product, suffixSearch, intersectionEventName } = props;

  const elRef = React.useRef<HTMLAnchorElement>(null);
  const isShowedRef = React.useRef(false);
  const entry = useObserverIntersection(elRef);
  React.useEffect(() => {
    const isWithoutFalsy = [
      !isShowedRef.current,
      entry,
      entry?.isIntersecting,
    ].every(Boolean);

    if (isWithoutFalsy) {
      posthog.capture(intersectionEventName, {
        handle: product.product_id,
      });

      isShowedRef.current = true;
    }
  }, [isShowedRef, entry, intersectionEventName, product]);

  const imageWrapper = {};
  Reflect.set(imageWrapper, "--ratio-percent", "100%");
  return (
    <>
      <div className="swiper-slide">
        <a
          ref={elRef}
          //   data-id="16062138380188655368253900"
          //   data-sku-id="18062138380193017444503900"
          //   data-index="2"
          //   data-status="false"
          //   data-name={product.name}
          //   data-price={product.price}
          //   data-module-type=""
          //   data-__tracker-total-view-time="0"
          //   data-__tracker-last-view-started="0"
          //   data-__tracker-selector=".__sl-custom-track-product-item-16062138380188655368253900"
          //   data-__tracker-view-once="1"
          className="recommend-product-item shopline-element-product-item __sl-custom-track-product-list-item __sl-custom-track-product-item-16062138380188655368253900 hasColorCellected __sl-custom-track-product-recommend-item"
          href={toSuffixSearchURL(product.productlink, suffixSearch)}
        >
          <div
            className="recommend-product-item-image-wrapper"
            style={imageWrapper}
          >
            <div className="recommend-product-item-image-media card__inner">
              <div className="recommend-product-item-image">
                <img src={product.main_image_url} alt={product.product_title} />
              </div>
            </div>
            {/* <div className="recommend-product-item-button-warpper">
              <button className="button button--full-width button--secondary">
                <span>Add to cart</span>
              </button>
            </div> */}
          </div>

          <div className="recommend-product-item-info">
            <div className="recommend-product-item-title product-grid-font  display-2-row">
              {product.product_title}
            </div>
            <div className="recommend-product-item-price body-font display-center">
              <span className="sale-price ">
                <span data-product-item-price="3900" data-from="">
                  <span className="notranslate isolate">
                    ${product.product_price}
                  </span>
                </span>
              </span>
            </div>
          </div>
        </a>
      </div>
    </>
  );
}

function toSuffixSearchURL(params: string, suffixSearch: string) {
  const url = new URL(params);
  url.searchParams.set("wd", suffixSearch);
  return url.href;
}

export interface RecsItemProps {
  product: Product;
  suffixSearch: string;
  intersectionEventName: string;
}
