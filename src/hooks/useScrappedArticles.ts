import { generateTraceId, ServerResponse } from "@dealbase/core";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useMemo } from "react";
import { config } from "../lib/config";

export function useScrappedArticles(
  number = 7,
  unit = "days",
): Omit<UseQueryResult, "data"> & {
  sources: any[] | undefined;
} {
  const { data, ...rest } = useQuery<ServerResponse<any>>({
    queryKey: ["scrapped-articles"],
    // @ts-ignore
    queryFn: () =>
      fetch(`/api/scrapper?number=${number}&unit=${unit}`, {
        headers: {
          "x-trace-id": generateTraceId(),
          authorization: `Bearer ${config.apiKey}`,
        },
      }).then((res) => res.json()),
  });

  return useMemo(
    () => ({
      // @ts-ignore
      sources: data?.data as any[],
      ...rest,
    }),
    [data],
  );
}
