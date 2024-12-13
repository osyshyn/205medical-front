export const getArrayFromStringParams = (stringParams: string) =>
  stringParams !== "" ? stringParams?.split(",") : [];
