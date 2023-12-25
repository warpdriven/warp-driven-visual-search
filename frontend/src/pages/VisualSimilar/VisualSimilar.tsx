// Components Imports
import { ProductList } from "./ProductList";

// Query Imports
import { useSettingsQuery } from "@/hooks/api-wpadmin";

// PostHog Imports
import { PostHogProvider } from "posthog-js/react";

export function VisualSimilar() {
  const query = useSettingsQuery();

  // API pending & error
  if (!query.data) {
    return <></>;
  }

  return (
    <PostHogProvider
      apiKey={query.data.wd_data_server_key}
      options={{
        api_host: query.data.wd_data_server
          ? `https://data-${query.data.wd_data_server}.warpdriven.ai`
          : "https://app.posthog.com",
      }}
    >
      <ProductList></ProductList>
    </PostHogProvider>
  );
}
