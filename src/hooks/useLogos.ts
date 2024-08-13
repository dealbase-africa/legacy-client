import { generateTraceId, Logo, ServerResponse } from "@dealbase/core";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { config } from "../lib/config";

export type CompaniesFilterType = Partial<Record<keyof Logo, string | number>>;

export function useLogos(): Omit<UseQueryResult, "refetch" | "data"> & {
  logos: Logo[] | undefined;
  refetchLogos: () => void;
} {
  const { data, refetch, ...rest } = useQuery<ServerResponse<Logo[]>>({
    queryKey: ["logos"],
    // @ts-ignore
    queryFn: () =>
      fetch(`/api/logos`, {
        headers: {
          "x-trace-id": generateTraceId(),
          authorization: `Bearer ${config.apiKey}`,
        },
      }).then((res) => res.json()),
    refetchOnWindowFocus: true,
  });

  return {
    refetchLogos: refetch,
    // @ts-ignore
    logos: data?.data as Logo[],
    ...rest,
  };
}
