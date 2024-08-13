import { generateTraceId } from "@dealbase/core";
import { useQuery } from "@tanstack/react-query";
import { config } from "../lib/config";
import { useAuthHeaders } from "./useAuthHeaders";
export function useCompanies() {
    const authHeaders = useAuthHeaders();
    const { data, refetch, ...rest } = useQuery({
        queryKey: ["companies"],
        // @ts-ignore
        queryFn: () => fetch(`${config.dealbaseApiUrl}/companies`, {
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
        companies: data?.data,
        ...rest,
    };
}
//# sourceMappingURL=useCompanies.js.map