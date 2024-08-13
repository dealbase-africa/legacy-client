import { Company, generateTraceId, ServerResponse } from "@dealbase/core";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { config } from "../lib/config";
import { useAuthHeaders } from "./useAuthHeaders";

export function useCompanies(): Omit<UseQueryResult, "refetch" | "data"> & {
  companies: Company[] | undefined;
  refetchCompanies: () => void;
} {
  const authHeaders = useAuthHeaders();

  const { data, refetch, ...rest } = useQuery<ServerResponse<Company>>({
    queryKey: ["companies"],
    // @ts-ignore
    queryFn: () =>
      fetch(`${config.dealbaseApiUrl}/companies`, {
        headers: {
          "x-trace-id": generateTraceId(),
          authorization: `Bearer ${config.apiKey}`,
          ...(authHeaders || {}),
        },
      }).then((res) => res.json()),
    refetchOnWindowFocus: false,
  });

  return {
    refetchCompanies: refetch,
    // @ts-ignore
    companies: data?.data as Company[],
    ...rest,
  };
}
