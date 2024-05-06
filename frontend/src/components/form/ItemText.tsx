import { TextField } from "@mui/material";
import { useFormContext, useController } from "react-hook-form";
import type { TextFieldProps } from "@mui/material";

export function ItemText(props: Props) {
  const { name, disabled, ...restProps } = props;

  // Form Hooks
  const formCtx = useFormContext();
  const controller = useController({
    name,
    control: formCtx.control,
    defaultValue: "",
    disabled,
  });

  return (
    <TextField
      {...controller.field}
      fullWidth
      error={!!controller.fieldState.error}
      helperText={controller.fieldState.error?.message}
      {...restProps}
    />
  );
}

type Props = TextFieldProps & { name: string };
