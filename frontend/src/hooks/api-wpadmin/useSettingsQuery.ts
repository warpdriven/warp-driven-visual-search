// Query Imports
import { useQuery } from "@tanstack/react-query";

// API Imports
import { get_warp_driven_settings } from "@/api/wpadmin";

export function useSettingsQuery() {
  return useQuery({
    queryKey: ["get_warp_driven_settings"],
    queryFn({ signal }) {
      return get_warp_driven_settings({ signal });
    },
  });
}
