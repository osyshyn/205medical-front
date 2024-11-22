export const getItemPath = (
  path: string,
  params: Record<string, string | number>
) => {
  return path.replace(/:(\w+)/g, (_, key: string | number) =>
    String(params[key])
  );
};
