import { generateTraceId } from "@dealbase/core";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { config } from "../lib/config";
export function useScrappedArticles(number = 7, unit = "days") {
    const { data, ...rest } = useQuery({
        queryKey: ["scrapped-articles"],
        // @ts-ignore
        queryFn: () => fetch(`/api/scrapper?number=${number}&unit=${unit}`, {
            headers: {
                "x-trace-id": generateTraceId(),
                authorization: `Bearer ${config.apiKey}`,
            },
        }).then((res) => res.json()),
    });
    return useMemo(() => ({
        // @ts-ignore
        sources: data?.data,
        ...rest,
    }), [data]);
}
//# sourceMappingURL=useScrappedArticles.js.map