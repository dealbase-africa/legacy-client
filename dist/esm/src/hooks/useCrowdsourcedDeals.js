import { generateTraceId } from "@dealbase/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { config } from "../lib/config";
import { useAuthHeaders } from "./useAuthHeaders";
export function useCrowdsourcedDeals() {
    const authHeaders = useAuthHeaders();
    const { data, refetch, ...rest } = useQuery({
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
    return useMemo(() => ({
        refetchDeals: refetch,
        // @ts-ignore
        crowdsourced_deals: data?.data,
        ...rest,
    }), [data]);
}
//# sourceMappingURL=useCrowdsourcedDeals.js.map