import { generateTraceId, ServerResponse } from "@dealbase/core";
import { Subscriber } from "@dealbase/db";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useEffect } from "react";
import { config } from "../lib/config";
import { useAuthHeaders } from "./useAuthHeaders";

export function useSubscribers(): Omit<UseQueryResult, "refetch" | "data"> & {
  subscribers: Subscriber[] | undefined;
  refetchSubscribers: () => void;
} {
  const authHeaders = useAuthHeaders();

  const { data, refetch, ...rest } = useQuery<ServerResponse>({
    queryKey: ["subscribers"],
    // @ts-ignore
    queryFn: () =>
      fetch(`${config.dealbaseApiUrl}/subscribers`, {
        headers: {
          "x-trace-id": generateTraceId(),
          authorization: `Bearer ${config.apiKey}`,
          ...(authHeaders || {}),
        },
      }).then((res) => res.json()),
    enabled: !!authHeaders,
  });

  useEffect(() => {
    if (authHeaders) {
      refetch();
    }
  }, [authHeaders, refetch]);

  return {
    refetchSubscribers: refetch,
    // @ts-ignore
    subscribers: data?.data as Subscriber[],
    ...rest,
  };
}
