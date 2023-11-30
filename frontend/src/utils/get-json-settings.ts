// Utils Imports
import { toJsonForEl } from "./to-json-for-el";

export function getJsonSettings() {
  // Empty Element
  const el = document.getElementById("warpdriven-recs-json-settings-main");
  if (!el) {
    console.error("No element warpdriven-recs-settings-main");
    return null;
  }

  return toJsonForEl<Settings>(el);
}

export interface Settings {
  data_server: string;
  data_server_key: string;
  recommender_api_key: string;
  is_test_mode: boolean;
}
