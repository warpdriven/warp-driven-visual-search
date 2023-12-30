// Components Imports
import { SettingsForm } from "./SettingsForm";
import { CardTop } from "./CardTop";

// MUI Imports
import { Stack } from "@mui/material";

export function Admin() {
  return (
    <>
      <Stack spacing={4} sx={{ mt: 4, mr: 4 }}>
        <CardTop></CardTop>
        <SettingsForm></SettingsForm>
      </Stack>
    </>
  );
}
