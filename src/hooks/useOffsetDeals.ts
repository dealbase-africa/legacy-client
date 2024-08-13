import { Deal, Filter, generateTraceId, ServerResponse } from "@dealbase/core";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useMemo } from "react";
import { config } from "../lib/config";

export function useOffsetDeals(filterOverride?: Filter): Omit<
  UseQueryResult,
  "refetch" | "data"
> & {
  deals: Deal[] | undefined;
  refetchDeals: () => void;
} {
  const stringifiedFilter = JSON.stringify(filterOverride);

  const { data, refetch, ...rest } = useQuery<ServerResponse<Deal>>({
    queryKey: ["deals", stringifiedFilter],
    // @ts-ignore
    queryFn: () =>
      fetch(`/api/deals?filter=${stringifiedFilter}`, {
        headers: {
          "x-trace-id": generateTraceId(),
          "x-auth-token": process.env.NEXT_PUBLIC_X_AUTH_TOKEN as string,
          authorization: `Bearer ${config.apiKey}`,
        },
      }).then((res) => res.json()),
  });

  return useMemo(
    () => ({
      refetchDeals: refetch,
      // @ts-ignore
      deals: data?.data as Deal[],
      ...rest,
    }),
    [data],
  );
}
