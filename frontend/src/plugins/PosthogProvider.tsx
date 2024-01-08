// PostHog Imports
import { PostHogProvider } from "posthog-js/react";
import posthog from "posthog-js";

// React Imports
import React from "react";

// Utils Imports
import { getJsonProduct, getJsonSettings } from "@/utils";

export function PosthogProvider(props: React.PropsWithChildren) {
  // ** Props
  const { children } = props;

  const sended = React.useRef(false);

  React.useEffect(() => {
    const settings = getJsonSettings();

    if (import.meta.env.DEV) {
      console.log(settings);
    }

    if (!settings) return;

    posthog.init(settings.wd_data_server_key, {
      api_host: settings.wd_data_server
        ? `https://data-${settings.wd_data_server}.warpdriven.ai`
        : "https://app.posthog.com",
    });

    if (settings.user_email) {
      posthog.identify(settings.user_email);
    }

    // Capture event only once per mount
    if (sended.current) return;

    const product = getJsonProduct();

    switch (settings.page_type) {
      case "product":
        posthog.capture("product_view", {
          product_id: product?.id,
        });
        break;

      case "shop":
        posthog.capture("shop_view");
        break;

      case "fallback":
        break;

      default:
    }

    sended.current = true;
  }, [sended]);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
