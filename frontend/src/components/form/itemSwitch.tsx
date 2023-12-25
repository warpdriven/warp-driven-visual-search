// MUI Imports
import { Switch, SwitchProps } from "@mui/material";

// Form Imports
import { useFormContext, useController } from "react-hook-form";

export function ItemSwitch(props: ItemSwitchProps) {
  // ** Props
  const { name, disabled, ...restProps } = props;

  const formCtx = useFormContext();
  const controller = useController({
    control: formCtx.control,
    name,
    disabled,
    defaultValue: false,
  });

  return (
    <Switch
      {...controller.field}
      checked={controller.field.value}
      onChange={(evt, checked) => {
        void evt;

        controller.field.onChange(checked);
      }}
      {...restProps}
    ></Switch>
  );
}

type ItemSwitchProps = SwitchProps & {
  name: string;
};
