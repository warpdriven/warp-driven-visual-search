// Components Imports
// import { MutationSuspense } from "@/components";
import { VisualSimilar } from "@/pages/VisualSimilar";
import { Admin } from "@/pages/admin";

// Query Imports
import { useSettingsQuery } from "@/hooks/api-wpadmin";

// PostHog Imports
import { PostHogProvider } from "posthog-js/react";

// React Imports
import React from "react";
import ReactDOM from "react-dom";

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
      <Portal
        container={() => {
          return document.getElementById("warpdriven-recs-vsr");
        }}
      >
        <VisualSimilar></VisualSimilar>
      </Portal>
      <Portal
        container={() => {
          return document.getElementById("warpdriven-recs-admin");
        }}
      >
        <Admin></Admin>
      </Portal>
    </PostHogProvider>
  );
}

function Portal(props: PortalProps) {
  const { container, children, ...restProps } = props;
  void restProps;

  const el = container();
  if (el) {
    return ReactDOM.createPortal(children, el);
  }

  return <></>;
}

export interface PortalProps {
  container(): ReturnType<typeof document.getElementById>;
  children: React.ReactNode;
}
