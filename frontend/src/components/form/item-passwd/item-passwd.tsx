// MUI Imports
import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
} from "@mui/material";

// Form Imports
import { useFormContext, useController } from "react-hook-form";

// React Imports
import React from "react";

// Components Imports
import { ToggleIcon } from "./ToggleIcon";

export type ItemPasswdProps = OutlinedInputProps & { name: string };

export function ItemPasswd(props: ItemPasswdProps) {
  // ** Props
  const { name, label, required, sx, disabled, ...restProps } = props;

  // Form Hooks
  const formCtx = useFormContext();
  const controller = useController({
    name,
    control: formCtx.control,
    defaultValue: "",
    disabled,
  });

  // Show Password
  const [isShowPasswd, setIsShowPasswd] = React.useState(false);

  return (
    <FormControl fullWidth error={!!controller.fieldState.error} sx={sx}>
      <InputLabel required>{label}</InputLabel>
      <OutlinedInput
        {...controller.field}
        type={isShowPasswd ? "text" : "password"}
        label={label}
        required={required}
        endAdornment={
          <ToggleIcon
            value={isShowPasswd}
            onChange={setIsShowPasswd}
          ></ToggleIcon>
        }
        {...restProps}
      />
      {!!controller.fieldState.error && (
        <FormHelperText>{controller.fieldState.error.message}</FormHelperText>
      )}
    </FormControl>
  );
}
