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
import { ItemText } from "@/components/form";

// Store Imports
import { useSearchParams } from "@/hooks/store";

// Form Imports
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export function Admin() {
  const [searchParams, setSearchParams] = useSearchParams();

  const formCtx = useForm({
    async defaultValues() {
      return {};
    },

    resolver: yupResolver(yup.object().shape({})),
  });

  // Connect mode
  const hasToken = searchParams.get("access_token");
  if (hasToken) {
    return <ConnectForm />;
  }

  // Setting mode
  return (
    <FormProvider {...formCtx}>
      <StyledCard>
        <CardHeader title="WarpDriven Settings"></CardHeader>
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}></Grid>
            <Grid item xs={12} sm={6}></Grid>
            <Grid item xs={12} sm={6}></Grid>
          </Grid>
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
    </FormProvider>
  );
}

const StyledCard = styled(Card)(({ theme }) => {
  return { marginTop: theme.spacing(3) };
});
