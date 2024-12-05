import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

type Value = string | number | boolean;

export const useQueryParams = () => {
  const [queryParams, setQueryParams] = useSearchParams();

  const getQueryParam = useCallback(
    (key: string) => queryParams.get(key),
    [queryParams]
  );

  const setQueryParam = useCallback(
    (key: string, value: Value) => {
      queryParams.set(key, String(value));
      setQueryParams(queryParams);
    },
    [setQueryParams, queryParams]
  );

  const deleteQueryParam = useCallback(
    (key: string) => {
      queryParams.delete(key);
      setQueryParams(queryParams);
    },
    [setQueryParams, queryParams]
  );

  const setMultipleQueryParams = useCallback(
    (params: Record<string, Value>) => {
      Object.keys(params).forEach((key) => {
        queryParams.set(key, String(params[key]));
      });
      setQueryParams(queryParams);
    },
    [setQueryParams, queryParams]
  );

  return {
    queryParams,
    getQueryParam,
    setQueryParam,
    deleteQueryParam,
    setMultipleQueryParams,
  };
};
