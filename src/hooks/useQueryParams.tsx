import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export const useQueryParams = () => {
  const [queryParams, setQueryParams] = useSearchParams();

  const getQueryParam = useCallback(
    (key: string) => queryParams.get(key),
    [queryParams]
  );

  const setQueryParam = useCallback(
    (key: string, value: string | number) => {
      queryParams.set(key, String(value));
      setQueryParams(queryParams);
    },
    [setQueryParams, queryParams]
  );

  return { getQueryParam, setQueryParam };
};
