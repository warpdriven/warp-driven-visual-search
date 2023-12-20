// Components Imports
import { ConnectForm } from "./ConnectForm";
import { SettingsForm } from "./SettingsForm";

// Store Imports
import { useSearchParams } from "@/hooks/store";

export function Admin() {
  const [searchParams] = useSearchParams();

  // Connect mode
  const hasToken = searchParams.get("access_token");
  if (hasToken) {
    return <ConnectForm></ConnectForm>;
  }

  // Setting mode
  return <SettingsForm></SettingsForm>;
}
