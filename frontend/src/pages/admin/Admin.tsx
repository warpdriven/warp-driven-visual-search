// MUI Imports
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Grid,
  styled,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

// React Imports
// import React from "react";

// Components Imports
import { ConnectForm } from "./ConnectForm";

// Store Imports
import { useSearchParams } from "@/hooks/store";

export function Admin() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Connect mode
  const hasToken = searchParams.get("access_token");
  if (hasToken) {
    return <ConnectForm />;
  }

  // Setting mode
  return (
    <>
      <StyledCard>
        <CardHeader title="WarpDriven Settings"></CardHeader>
        <CardContent>
          <Grid container spacing={6}></Grid>
        </CardContent>
        <CardActions>
          <LoadingButton variant="contained">save</LoadingButton>
          <Button
            onClick={() => {
              setSearchParams((prev) => {
                prev.set("access_token", "hello");

                return prev;
              });
            }}
          >
            connect
          </Button>
        </CardActions>
      </StyledCard>
    </>
  );
}

const StyledCard = styled(Card)(({ theme }) => {
  return { marginTop: theme.spacing(3) };
});
