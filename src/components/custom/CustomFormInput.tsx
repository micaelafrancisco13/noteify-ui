import { Controller, useFormContext } from "react-hook-form";
import React from "react";

interface Props<T> {
  name: string;
  label: string;
  // children: ReactNode;
  renderComponent: (field: any) => React.ReactNode;
}

function CustomRadioGroup(props: Props) {
  const { control } = useFormContext();

  const { label, name, children } = props;
  const fieldName = name ? name : label.toLowerCase();

  return (
    <Controller
      name={fieldName}
      // render={(renderProps) => (
      //   <>{cloneElement(children, { ...renderProps })}</>
      // )}
      render={({ field }) => <>{renderComponent(field)}</>}
      control={control}
    />
  );
}

export default CustomRadioGroup;
