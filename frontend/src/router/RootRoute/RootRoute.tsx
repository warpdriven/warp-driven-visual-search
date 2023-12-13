// Pages Imports
import { Detail } from "@/pages/detail";

// Query Imports
import { useSettingsQuery } from "@/hooks/api-wpadmin";

// PostHog Imports
import { PostHogProvider } from "posthog-js/react";

export function RootRoute() {
  const query = useSettingsQuery();

  // API pending & error
  if (!query.data) {
    return <></>;
  }

  // Tese mode enable
  if (query.data.is_test_mode === true) {
    const searchParams = new URLSearchParams(window.location.search);
    const wd_demo = searchParams.get("wd_demo");

    switch (wd_demo) {
      case "true":
        break;
      default:
        return <></>;
    }
  }

  // Normal content
  return (
    <PostHogProvider
      apiKey={query.data.data_server_key}
      options={{
        api_host: query.data.data_server
          ? `https://data-${query.data.data_server}.warpdriven.ai`
          : "https://app.posthog.com",
      }}
    >
      <Detail />
    </PostHogProvider>
  );
}
