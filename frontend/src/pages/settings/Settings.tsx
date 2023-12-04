// React Imports
import React from "react";

// Components Imports
import { MutationSuspense } from "@/components";

// MUI Imports
import { Box, CircularProgress, Typography } from "@mui/material";

export function Settings() {
  return (
    <>
      <MutationSuspense
        containerId="warpdriven-recs-admin"
        fallback={
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            minHeight={320}
          >
            <CircularProgress />
            <Typography variant="body2" mt={4}>
              Loading...
            </Typography>
          </Box>
        }
      >
        <SettingsForm />
      </MutationSuspense>
    </>
  );
}

const SettingsForm = React.lazy(() => import("./SettingsForm"));
