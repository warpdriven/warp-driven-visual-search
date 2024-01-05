// Components Imports
import { ProductList } from "./ProductList";

// Utils Imports
import { getJsonSettings } from "@/utils";

export function VisualSimilar() {
  const settings = getJsonSettings();

  // Checking settings
  if (!settings) {
    return null;
  }

  // Tese mode enable
  if (settings.wd_is_test_mode === "on") {
    switch (new URLSearchParams(window.location.search).get("wd_demo")) {
      case "true":
        break;
      default:
        return null;
    }
  }

  return <ProductList></ProductList>;
}
