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
  collection: string | number;
  collection_products: Array<string | number>;
  page_type: "product" | "shop" | "admin" | "fallback";
  user_email: string;

  wd_api_key: string;
  wd_data_server_key: string;
  wd_data_server: string;
  wd_custom_js: string;
  wd_is_test_mode: "on" | "off";
}
