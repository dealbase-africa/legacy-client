import { generateTraceId, ServerResponse } from "@dealbase/core";
import { CrowdsourcedDeal } from "@dealbase/db";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { config } from "../lib/config";
import { useAuthHeaders } from "./useAuthHeaders";

export function useCrowdsourcedDeals(): Omit<
  UseQueryResult,
  "refetch" | "data"
> & {
  crowdsourced_deals: CrowdsourcedDeal[] | undefined;
  refetchDeals: () => void;
} {
  const authHeaders = useAuthHeaders();

  const { data, refetch, ...rest } = useQuery<
    ServerResponse<CrowdsourcedDeal[]>
  >({
    queryKey: ["crowdsourced-deals"],
    // @ts-ignore
    queryFn: async () => {
      return fetch(`${config.dealbaseApiUrl}/crowdsourced-deal`, {
        headers: {
          "x-trace-id": generateTraceId(),
          authorization: `Bearer ${config.apiKey}`,
          ...(authHeaders || {}),
        },
      }).then((res) => res.json());
    },
    enabled: !!authHeaders,
  });

  useEffect(() => {
    if (authHeaders) {
      refetch();
    }
  }, [authHeaders, refetch]);

  return useMemo(
    () => ({
      refetchDeals: refetch,
      // @ts-ignore
      crowdsourced_deals: data?.data as CrowdsourcedDeal[],
      ...rest,
    }),
    [data],
  );
}
