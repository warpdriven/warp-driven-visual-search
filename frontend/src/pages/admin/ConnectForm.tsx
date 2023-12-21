// MUI Imports
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  styled,
  Grid,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { LinkOutlined } from "@mui/icons-material";

// React Imports
// import React from "react";

// Store Imports
import { useSearchParams } from "@/hooks/store";

// Query Imports
import { useAddConnect } from "@/hooks/api-wpadmin";

// Form Imports
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Components Imports
import { ItemText } from "@/components/form";

// Toast Imports
import toast from "react-hot-toast";

export function ConnectForm() {
  const [searchParams] = useSearchParams();

  const formCtx = useForm({
    defaultValues: {
      site_url: window.location.origin,
    },

    resolver: yupResolver(
      yup.object().shape({
        site_url: yup.string().url().max(256).required(),
      })
    ),
  });

  const mutation = useAddConnect();

  const handleSubmit = formCtx.handleSubmit((data) => {
    mutation.mutate(
      {
        data: {
          site_url: data.site_url,
          access_token: searchParams.get("access_token") || "",
          env: searchParams.get("env") || "",
        },
      },
      {
        onError(error) {
          toast.error(error.message);
        },
        onSuccess() {
          const url = new URL(
            "/connection/my-connection",
            searchParams.get("return_url") || "http://stg.warpdriven.ai"
          );
          url.searchParams.set("refresh_conn", "true");

          window.open(url, "_parent");
        },
      }
    );
  });

  return (
    <FormProvider {...formCtx}>
      <StyledCard>
        <CardHeader
          title="New connection"
          subheader="Connect your WooCommerce store to our platform"
        ></CardHeader>
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <ItemText
                name="site_url"
                label="Site URL"
                InputProps={{ readOnly: true }}
              ></ItemText>
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <LoadingButton
            onClick={handleSubmit}
            loading={mutation.isPending}
            variant="contained"
            startIcon={<LinkOutlined></LinkOutlined>}
          >
            connect
          </LoadingButton>
        </CardActions>
      </StyledCard>
    </FormProvider>
  );
}

const StyledCard = styled(Card)(({ theme }) => {
  return {
    marginTop: theme.spacing(4),

    '& input[type="text"],& input[type="url"]': {
      padding: "16.5px 14px",
      border: 0,

      minHeight: "inherit",

      color: "currentColor",
      lineHeight: "inherit",

      "&:focus": {
        border: 0,
        boxShadow: theme.shadows[0],
        outline: 0,
      },
    },
  };
});
