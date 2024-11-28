import { ImageValue, Row, StyledValue } from "src/@types/table";

export const getKeyValue = (
  obj: Row,
  key: string
): string | JSX.Element | number => {
  const value = obj[key];

  if (typeof value === "string" || typeof value === "number") {
    return value;
  }

  if (isImageValue(value)) {
    return (
      <div className="h-10 w-10">
        <img
          className="border-purple-lighter h-full w-full rounded-md border"
          src={value.src}
          alt={value.alt || "Image"}
          style={value.style || {}}
        />
      </div>
    );
  }

  if (isStyledValue(value)) {
    return <span style={value.style}>{value.value}</span>;
  }

  return null;
};

const isImageValue = (value: any): value is ImageValue => {
  return value?.type === "image";
};

const isStyledValue = (value: any): value is StyledValue => {
  return value && "value" in value && "style" in value;
};
