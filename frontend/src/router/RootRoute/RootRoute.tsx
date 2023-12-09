// Pages Imports
import { Detail } from "@/pages/detail";
// import { Settings } from "@/pages/settings";

// Query Imports
import { useSettingsQuery } from "@/hooks/api-wpadmin";

// PostHog Imports
import { PostHogProvider } from "posthog-js/react";

export function RootRoute() {
  const query = useSettingsQuery();

  return (
    <PostHogProvider
      apiKey={query.data?.data_server_key}
      options={{
        api_host: query.data?.data_server
          ? `https://data-${query.data.data_server}.warpdriven.ai`
          : "https://app.posthog.com",
      }}
    >
      <Detail />
      {/* <Settings /> */}
    </PostHogProvider>
  );
}
