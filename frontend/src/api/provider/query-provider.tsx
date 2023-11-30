// API Hooks
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./query-client";

export function QueryProvider(props: React.PropsWithChildren) {
  // ** Props
  const { children } = props;

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
