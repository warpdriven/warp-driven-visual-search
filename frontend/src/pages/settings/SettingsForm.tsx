// MUI Imports
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

// Components Imports
import { ItemText } from "@/components/form";

// Form Imports
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Utils Imports
import { timeout } from "@/utils";

export function SettingsForm() {
  const formCtx = useForm({
    async defaultValues() {
      await timeout(1000 * 3);
      return {
        api_key: "",
      };
    },

    resolver: yupResolver(
      yup.object().shape({
        api_key: yup.string().max(64).required(),
      })
    ),
  });

  const handleSubmit = formCtx.handleSubmit((data) => {
    console.log(data);
    setTimeout(() => {
      formCtx.reset({ api_key: "new value" });
    }, 1000 * 3);
  });

  const handleReset = () => {
    formCtx.reset();
  };

  if (formCtx.formState.isLoading) {
    return (
      <>
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
      </>
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
            </Grid>
          </FormProvider>
        </CardContent>
        <CardActions>
          <LoadingButton onClick={handleSubmit} variant="contained">
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
