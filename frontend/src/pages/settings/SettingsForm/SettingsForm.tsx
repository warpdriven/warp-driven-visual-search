// MUI Imports
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControlLabel,
  Grid,
  Switch,
  styled,
  Skeleton,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

// Components Imports
import { ItemText } from "@/components/form";

// Form Imports
import { useForm, FormProvider, useController } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Query Imports
import { useQueryClient } from "@tanstack/react-query";
import { useSettingsMutation } from "@/hooks/api-wpadmin";

// API Imports
import { warpdriven_recs_settings } from "@/api/wpadmin";
import { Res } from "@/api/wpadmin/warpdriven_recs_settings";

// Toast Imports
import { toast } from "react-hot-toast";

export function SettingsForm() {
  const queryClient = useQueryClient();

  const formCtx = useForm({
    async defaultValues() {
      try {
        const queryData = await queryClient.fetchQuery<Res>({
          queryKey: ["warpdriven_recs_settings"],
          queryFn({ signal }) {
            return warpdriven_recs_settings({ signal });
          },
        });

        return {
          api_key: queryData.api_key || "",
          custom_js: queryData.custom_js || "",
          data_server: queryData.data_server || "",
          data_server_key: queryData.data_server_key || "",
          is_test_mode: queryData.is_test_mode,
        };
      } catch (error) {
        console.error(error);

        return {
          api_key: "",
          custom_js: "",
          data_server: "",
          data_server_key: "",
          is_test_mode: true,
        };
      }
    },

    resolver: yupResolver(
      yup.object().shape({
        api_key: yup.string().max(64).required(),
        custom_js: yup.string().url().max(128),
        data_server: yup.string().max(128),
        data_server_key: yup.string().max(128),
        is_test_mode: yup.boolean().required(),
      })
    ),
  });

  const switchFieldController = useController({
    control: formCtx.control,
    name: "is_test_mode",
    defaultValue: true,
  });

  const mutation = useSettingsMutation();

  const handleSubmit = formCtx.handleSubmit((data) => {
    mutation.mutate(
      {
        method: "POST",
        data: {
          api_key: data.api_key || "",
          custom_js: data.custom_js || "",
          data_server: data.data_server || "",
          data_server_key: data.data_server_key || "",
          is_test_mode: data.is_test_mode,
        },
      },
      {
        onSuccess(data) {
          formCtx.reset(data);
          toast.success("Save successlly!");
        },
        onError(error) {
          toast.error(error.message);
        },
      }
    );
  });

  const handleReset = () => {
    toast.success("Save successlly!");
    formCtx.reset();
  };

  // if (formCtx.formState.isLoading) {
  if (true) {
    return (
      <StyledCard>
        <CardHeader title="Loading..." />
        <CardContent>
          <Typography component="div" variant="h3">
            <Skeleton />
          </Typography>
          <Typography>
            <Skeleton animation="wave" />
          </Typography>
          <Typography variant="body2">
            <Skeleton animation={false} width={"60%"} />
          </Typography>
        </CardContent>
      </StyledCard>
    );
  }

  return (
    <>
      <StyledCard>
        <CardHeader title="Warpdriven API Settings" />
        <CardContent>
          <FormProvider {...formCtx}>
            <Grid container spacing={6}>
              <Grid item xs={12} md={6}>
                <ItemText
                  name="api_key"
                  label="API Key"
                  placeholder="API Key"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <ItemText
                  name="data_server"
                  label="Data Server"
                  placeholder="Data Server"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <ItemText
                  name="data_server_key"
                  label="Data Server Key"
                  placeholder="Data Server Key"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <ItemText
                  name="custom_js"
                  label="Custom JS"
                  placeholder="Custom JS"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      {...switchFieldController.field}
                      checked={switchFieldController.field.value}
                    />
                  }
                  label="Test Mode"
                  labelPlacement="start"
                />
              </Grid>
            </Grid>
          </FormProvider>
        </CardContent>
        <CardActions>
          <LoadingButton
            onClick={handleSubmit}
            loading={mutation.isPending}
            variant="contained"
          >
            submit
          </LoadingButton>
          <Button onClick={handleReset} variant="outlined">
            reset
          </Button>
        </CardActions>
      </StyledCard>
    </>
  );
}

const StyledCard = styled(Card)(({ theme }) => {
  return {
    marginTop: "1rem",

    '& input[type="text"]': {
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
