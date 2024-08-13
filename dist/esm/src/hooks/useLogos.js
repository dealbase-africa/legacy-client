import { generateTraceId } from "@dealbase/core";
import { useQuery } from "@tanstack/react-query";
import { config } from "../lib/config";
export function useLogos() {
    const { data, refetch, ...rest } = useQuery({
        queryKey: ["logos"],
        // @ts-ignore
        queryFn: () => fetch(`/api/logos`, {
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
        logos: data?.data,
        ...rest,
    };
}
//# sourceMappingURL=useLogos.js.map