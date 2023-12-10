// Pages Imports
import { Detail } from "@/pages/detail";
import { List } from "@/pages/list";
import { Settings } from "@/pages/settings";

// PostHog Imports
import { PostHogProvider } from "posthog-js/react";

// API Imports
import { useSettingsQuery } from "@/hooks/api-wpadmin";

export function App() {
  const query = useSettingsQuery();

  return (
    <>
      <PostHogProvider
        apiKey={query.data?.data_server_key}
        options={{
          api_host: query.data
            ? `https://data-${query.data.data_server}.warpdriven.ai`
            : void 0,
        }}
      >
        <Detail />
        <Settings />
        {import.meta.env.DEV && <List />}
      </PostHogProvider>
    </>
  );
}
