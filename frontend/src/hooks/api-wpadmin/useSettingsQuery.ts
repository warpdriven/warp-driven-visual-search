// Query Imports
import { useQuery } from "@tanstack/react-query";

// API Imports
import { warpdriven_recs_settings } from "@/api/wpadmin";

export function useSettingsQuery() {
  return useQuery({
    queryKey: ["warpdriven_recs_settings"],
    queryFn({ signal }) {
      return warpdriven_recs_settings({ signal });
    },
  });
}
