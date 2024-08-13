import { generateTraceId } from "@dealbase/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { config } from "../lib/config";
import { useAuthHeaders } from "./useAuthHeaders";
export function useSubscribers() {
    const authHeaders = useAuthHeaders();
    const { data, refetch, ...rest } = useQuery({
        queryKey: ["subscribers"],
        // @ts-ignore
        queryFn: () => fetch(`${config.dealbaseApiUrl}/subscribers`, {
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
        subscribers: data?.data,
        ...rest,
    };
}
//# sourceMappingURL=useSubscribers.js.map