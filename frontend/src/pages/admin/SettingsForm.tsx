import { zodResolver } from "@hookform/resolvers/zod";
import {
  SaveOutlined,
  RefreshOutlined,
  FeedbackOutlined,
} from "@mui/icons-material";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Grid,
  styled,
  FormControlLabel,
  Link,
  Tooltip,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { ItemText, ItemSwitch } from "@/components/form";
import { useSettingsMutation } from "@/hooks/api-wpadmin";
import { getJsonSettings } from "@/utils";
import type { CardProps } from "@mui/material";

export function SettingsForm() {
  const settings = getJsonSettings();

  const formCtx = useForm<FormValues>({
    defaultValues: {
      wd_api_key: settings?.wd_api_key || "",
      wd_data_server_key: settings?.wd_data_server_key || "",
      wd_data_server: settings?.wd_data_server || "",
      wd_custom_js: settings?.wd_custom_js || "",
      wd_is_test_mode: settings?.wd_is_test_mode === "on",
    },

    resolver: zodResolver(schema),
  });

  const mutation = useSettingsMutation();

  return (
    <FormProvider {...formCtx}>
      <StyledCard
        component="form"
        onSubmit={formCtx.handleSubmit(
          (data) => {
            return new Promise<void>((resolve) => {
              mutation.mutate(
                {
                  data: {
                    wd_api_key: data.wd_api_key,
                    wd_data_server_key: data.wd_data_server_key,
                    wd_data_server: data.wd_data_server,
                    wd_custom_js: data.wd_custom_js,
                    wd_is_test_mode: data.wd_is_test_mode ? "on" : "off",
                  },
                },
                {
                  onSettled() {
                    resolve();
                  },
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
                },
              );
            });
          },
          (error) => {
            console.error(error);
          },
        )}
        onReset={() => {
          formCtx.reset();
        }}
      >
        <CardHeader
          title="WarpDriven AI Settings"
          subheader={
            <>
              Don't know how to use it? Please visit{" "}
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
          subheaderTypographyProps={{ variant: "body2" }}
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
                control={<ItemSwitch name="wd_is_test_mode"></ItemSwitch>}
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
          <Button
            type={"submit"}
            disabled={mutation.isPending}
            variant="contained"
            startIcon={<SaveOutlined />}
          >
            save
          </Button>
          <Button
            type={"reset"}
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

const StyledCard = styled(Card)<CardProps>(({ theme }) => {
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

const schema = z.object({
  wd_api_key: z.string().min(1).max(128),
  wd_data_server_key: z.string().min(1).max(128),
  wd_data_server: z.string().max(128),
  wd_custom_js: z.string().url().max(256).or(z.string().length(0)),
  wd_is_test_mode: z.boolean(),
});

type FormValues = z.infer<typeof schema>;
