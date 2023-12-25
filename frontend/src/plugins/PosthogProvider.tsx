// PostHog Imports
import { PostHogProvider } from "posthog-js/react";
import posthog from "posthog-js";

// React Imports
import React from "react";

// Query Imports
import { useSettingsQuery } from "@/hooks/api-wpadmin";

export function PosthogProvider(props: React.PropsWithChildren) {
  // ** Props
  const { children } = props;

  const query = useSettingsQuery();
  const sended = React.useRef(false);

  React.useEffect(() => {
    // API pending
    if (query.isPending) {
      return;
    }

    // API failed
    if (query.isError) {
      return;
    }

    // API success
    if (query.isSuccess) {
      posthog.init(query.data.wd_data_server_key, {
        api_host: query.data.wd_data_server
          ? `https://data-${query.data.wd_data_server}.warpdriven.ai`
          : "https://app.posthog.com",
      });

      // Fetch only once per mount
      sended.current ||
        void (() => {
          posthog.capture(getPageType());
          sended.current = true;
        })();

      return;
    }
  }, [query.isPending, query.isError, query.isSuccess, query.data, posthog]);

  // API pending & error
  if (!query.data) {
    return <></>;
  }

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

function getPageType() {
  const pageTypeEl = document.getElementById("warpdriven-recs-page");
  if (!pageTypeEl) return "fallback";

  if ("isProduct" in pageTypeEl.dataset) {
    return "product_view";
  }

  if ("isShop" in pageTypeEl.dataset) {
    return "shop_view";
  }

  return "fallback";
}
