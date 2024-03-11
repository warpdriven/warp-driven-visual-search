import { Checkbox } from "@mui/material";
import { useFormContext, useController } from "react-hook-form";
import type { CheckboxProps } from "@mui/material";

export function ItemCheckbox(props: ItemCheckboxProps) {
  const { name, value, disabled, ...restProps } = props;

  // Form Field
  const formCtx = useFormContext();
  const controller = useController({
    name,
    control: formCtx.control,
    defaultValue: false,
    disabled,
  });

  const handleChange: HandleChange = (evt, checked) => {
    void evt;
    const nextFieldValue = toNextValue(checked, value, controller.field.value);
    controller.field.onChange(nextFieldValue);
  };

  return (
    <Checkbox
      {...controller.field}
      checked={toModel(value, controller.field.value)}
      onChange={handleChange}
      {...restProps}
    />
  );
}

function toModel(value: unknown, fieldValue: unknown) {
  const isVoid = value === void 0;
  if (isVoid) return Boolean(fieldValue);

  const list = toList(fieldValue);
  return list.includes(value);
}

function toNextValue(checked: boolean, value: unknown, fieldValue: unknown) {
  if (typeof value === "undefined") {
    return checked;
  }

  const list = toList(fieldValue);

  if (list.includes(value)) {
    return checked ? list : list.filter((el) => el !== value);
  }

  return checked ? [...list, value] : list;
}

function toList(fieldValue: unknown) {
  const isList = Array.isArray(fieldValue);
  return isList ? fieldValue : [];
}

export interface ItemCheckboxProps extends CheckboxProps {
  name: string;
}

type HandleChange = CheckboxProps["onChange"];
