import { generateTraceId } from "@dealbase/core";
import { useQuery } from "@tanstack/react-query";
import { config } from "../lib/config";
export function useInvestors() {
    const { data, refetch, ...rest } = useQuery({
        queryKey: ["investors"],
        // @ts-ignore
        queryFn: () => fetch(`/api/investors`, {
            headers: {
                "x-trace-id": generateTraceId(),
                "x-auth-token": process.env.NEXT_PUBLIC_X_AUTH_TOKEN,
                authorization: `Bearer ${config.apiKey}`,
            },
        }).then((res) => res.json()),
        refetchOnWindowFocus: false,
    });
    return {
        refetchInvestors: refetch,
        // @ts-ignore
        investors: data?.data,
        ...rest,
    };
}
//# sourceMappingURL=useInvestors.js.map