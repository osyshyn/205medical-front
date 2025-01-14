import { FC } from "react";
import cn from "classnames";
import { IRenderFormField } from "src/@types/form";

interface Props
  extends Pick<
    IRenderFormField,
    "className" | "fieldClassName" | "labelClassName" | "variant"
  > {
  disabled?: boolean;
  fields: IRenderFormField[];
}

export const RenderCreateFormFields: FC<Props> = ({
  fields = [],
  className,
  fieldClassName,
  labelClassName,
  ...props
}) => {
  const firstRow = fields.slice(0, 3);
  const secondRow = fields.slice(3, 5);
  const thirdRow = fields.slice(5, 7);

  const renderFields = (
    groupFields: IRenderFormField[],
    isFirstRow: boolean
  ) => (
    <div
      className={cn("grid gap-4", isFirstRow ? "grid-cols-3" : "grid-cols-2")}
    >
      {groupFields.map(({ component: Field, ...field }) => (
        <Field
          key={field.name}
          className={cn(
            "flex w-full flex-col",
            fieldClassName,
            field.className
          )}
          fieldClassName={cn("mb-4", field.fieldClassName)}
          labelClassName={cn(
            "mb-2 text-sm font-medium",
            labelClassName,
            field.labelClassName
          )}
          {...field}
          {...props}
        />
      ))}
    </div>
  );

  return (
    <div className={cn("w-full space-y-4", className)}>
      {renderFields(firstRow, true)}
      {renderFields(secondRow, false)}
      {renderFields(thirdRow, false)}
    </div>
  );
};
