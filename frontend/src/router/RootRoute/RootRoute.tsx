// Components Imports
import { MutationSuspense } from "@/components";

// Query Imports
import { useSettingsQuery } from "@/hooks/api-wpadmin";

// PostHog Imports
import { PostHogProvider } from "posthog-js/react";

// React Imports
import React from "react";

export function RootRoute() {
  const query = useSettingsQuery();

  // API pending & error
  if (!query.data) {
    return <></>;
  }

  // Normal content
  return (
    <PostHogProvider
      apiKey={query.data.wd_data_server_key}
      options={{
        api_host: query.data.wd_data_server
          ? `https://data-${query.data.wd_data_server}.warpdriven.ai`
          : "https://app.posthog.com",
      }}
    >
      <MutationSuspense containerId="warpdriven-recs-vsr">
        <VisualSimilar />
      </MutationSuspense>
      <MutationSuspense containerId="warpdriven-recs-admin">
        <Admin />
      </MutationSuspense>
    </PostHogProvider>
  );
}

const Admin = React.lazy(() => import("@/pages/admin"));
const VisualSimilar = React.lazy(() => import("@/pages/VisualSimilar"));
