import { generateTraceId, Investor, ServerResponse } from "@dealbase/core";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { config } from "../lib/config";

export function useInvestors(): Omit<UseQueryResult, "refetch" | "data"> & {
  investors: Investor[] | undefined;
  refetchInvestors: () => void;
} {
  const { data, refetch, ...rest } = useQuery<ServerResponse<Investor>>({
    queryKey: ["investors"],
    // @ts-ignore
    queryFn: () =>
      fetch(`/api/investors`, {
        headers: {
          "x-trace-id": generateTraceId(),
          "x-auth-token": process.env.NEXT_PUBLIC_X_AUTH_TOKEN as string,
          authorization: `Bearer ${config.apiKey}`,
        },
      }).then((res) => res.json()),
    refetchOnWindowFocus: false,
  });

  return {
    refetchInvestors: refetch,
    // @ts-ignore
    investors: data?.data as Investor[],
    ...rest,
  };
}
