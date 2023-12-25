// Form Imports
import { FormProvider, useController, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Query Imports
import { useQueryClient } from "@tanstack/react-query";
import { warpdriven_get_settings } from "@/api/wpadmin";
import { useSettingsMutation } from "@/hooks/api-wpadmin";

// MUI Imports
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Grid,
  styled,
  FormControlLabel,
  Switch,
  Link,
  Tooltip,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  SaveOutlined,
  RefreshOutlined,
  FeedbackOutlined,
} from "@mui/icons-material";

// Components Imports
import { SkeletonCard } from "@/components/ui";
import { ItemText } from "@/components/form";

// Toast Imports
import toast from "react-hot-toast";

export function SettingsForm() {
  const queryClient = useQueryClient();

  const formCtx = useForm<{
    wd_api_key: string;
    wd_data_server_key: string;
    wd_data_server?: string;
    wd_custom_js?: string;
    wd_is_test_mode: boolean;
  }>({
    async defaultValues() {
      try {
        const prev = await queryClient.fetchQuery({
          queryKey: ["warpdriven_get_settings"],
          queryFn({ signal }) {
            return warpdriven_get_settings({ signal });
          },
        });

        return {
          wd_api_key: prev.wd_api_key,
          wd_data_server_key: prev.wd_data_server_key,
          wd_data_server: prev.wd_data_server,
          wd_custom_js: prev.wd_custom_js,
          wd_is_test_mode: prev.wd_is_test_mode === "on",
        };
      } catch (error) {
        console.error(error);

        return {
          wd_api_key: "",
          wd_data_server_key: "",
          wd_data_server: "",
          wd_custom_js: "",
          wd_is_test_mode: true,
        };
      }
    },

    resolver: yupResolver(
      yup.object().shape({
        wd_api_key: yup.string().max(128).required(),
        wd_data_server_key: yup.string().max(128).required(),
        wd_data_server: yup.string().max(128),
        wd_custom_js: yup.string().url().max(256),
        wd_is_test_mode: yup.boolean().required(),
      })
    ),
  });

  const testModeController = useController({
    control: formCtx.control,
    name: "wd_is_test_mode",
    defaultValue: true,
  });

  const mutation = useSettingsMutation();

  const handleReset = () => {
    formCtx.reset();
  };

  const handleSubmit = formCtx.handleSubmit((data) => {
    mutation.mutate(
      {
        data: {
          wd_api_key: data.wd_api_key,
          wd_data_server_key: data.wd_data_server_key,
          wd_data_server: data.wd_data_server || "",
          wd_custom_js: data.wd_custom_js || "",
          wd_is_test_mode: data.wd_is_test_mode ? "on" : "off",
        },
      },
      {
        onError(error) {
          toast.error(error.message);
        },
        onSuccess(data, req) {
          formCtx.reset({
            wd_api_key: req.data?.wd_api_key || "",
            wd_data_server_key: req.data?.wd_data_server_key || "",
            wd_data_server: req.data?.wd_data_server || "",
            wd_custom_js: req.data?.wd_custom_js || "",
            wd_is_test_mode: req.data?.wd_is_test_mode === "on",
          });

          toast.success(data.msg);
        },
      }
    );
  });

  // API pending
  if (formCtx.formState.isLoading) {
    return <SkeletonCard sx={{ mt: 4 }}></SkeletonCard>;
  }

  // Normal content
  return (
    <FormProvider {...formCtx}>
      <StyledCard>
        <CardHeader
          title="WarpDriven AI Settings"
          subheader={
            <>
              For more features, please visit{" "}
              <Link
                href="https://warpdriven.ai"
                target="_blank"
                underline="always"
                sx={{ textDecorationLine: "underline" }}
              >
                WarpDriven AI
              </Link>
            </>
          }
          action={
            <Tooltip title="Feedback">
              <Button href="https://warpdriven.ai/ticket/" target="_blank">
                <FeedbackOutlined></FeedbackOutlined>
              </Button>
            </Tooltip>
          }
        ></CardHeader>
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    {...testModeController.field}
                    checked={testModeController.field.value}
                  ></Switch>
                }
                label="Test mode"
                labelPlacement="start"
              ></FormControlLabel>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ItemText
                name="wd_api_key"
                label="Recommendation API key"
              ></ItemText>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ItemText
                name="wd_data_server_key"
                label="Data Server Key"
              ></ItemText>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ItemText
                name="wd_data_server"
                label="Custom Data Server"
              ></ItemText>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ItemText
                name="wd_custom_js"
                label="Custom JS"
                type="url"
              ></ItemText>
            </Grid>
          </Grid>
        </CardContent>

        <CardActions>
          <LoadingButton
            onClick={handleSubmit}
            loading={mutation.isPending}
            variant="contained"
            startIcon={<SaveOutlined />}
          >
            save
          </LoadingButton>
          <Button
            onClick={handleReset}
            variant="outlined"
            color="secondary"
            startIcon={<RefreshOutlined></RefreshOutlined>}
          >
            reset
          </Button>
        </CardActions>
      </StyledCard>
    </FormProvider>
  );
}

const StyledCard = styled(Card)(({ theme }) => {
  return {
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
