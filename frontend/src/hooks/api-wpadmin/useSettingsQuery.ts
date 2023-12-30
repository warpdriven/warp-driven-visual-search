// Query Imports
import { useQuery } from "@tanstack/react-query";
import { warpdriven_get_settings } from "@/api/wpadmin";

export function useSettingsQuery() {
  return useQuery({
    queryKey: ["warpdriven_get_settings"],
    queryFn({ signal }) {
      return warpdriven_get_settings({ signal });
    },
  });
}
