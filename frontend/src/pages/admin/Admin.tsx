// Components Imports
import { Stack } from "@mui/material";
import { CardTop } from "./CardTop";
import { SettingsForm } from "./SettingsForm";

// MUI Imports

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
