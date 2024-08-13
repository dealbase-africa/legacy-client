import { generateTraceId } from "@dealbase/core";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { config } from "../lib/config";
export function useDeals() {
    const { data, refetch, ...rest } = useQuery({
        queryKey: ["deals"],
        // @ts-ignore
        queryFn: () => fetch(`/api/deals`, {
            headers: {
                "x-trace-id": generateTraceId(),
                "x-auth-token": process.env.NEXT_PUBLIC_X_AUTH_TOKEN,
                authorization: `Bearer ${config.apiKey}`,
            },
        }).then((res) => res.json()),
    });
    return useMemo(() => ({
        refetchDeals: refetch,
        // @ts-ignore
        deals: data?.data,
        ...rest,
    }), [data]);
}
//# sourceMappingURL=useDeals.js.map