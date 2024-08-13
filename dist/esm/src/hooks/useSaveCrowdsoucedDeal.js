import { generateTraceId } from "@dealbase/core";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { config } from "../lib/config";
import { useAuthHeaders } from "./useAuthHeaders";
export function useSaveCrowdsourcedDeal(onClose) {
    const authHeaders = useAuthHeaders();
    const queryClient = useQueryClient();
    const { mutate, ...rest } = useMutation({
        mutationFn: async (inputData) => {
            return fetch(`${config.dealbaseApiUrl}/crowdsourced_deal`, {
                method: "POST",
                body: JSON.stringify(inputData),
                headers: {
                    "content-type": "application/json",
                    "x-trace-id": generateTraceId(),
                    authorization: `Bearer ${config.apiKey}`,
                    ...(authHeaders || {}),
                },
            }).then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json();
            });
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["crowdsourced_deals"],
                type: "active",
            });
            onClose();
        },
        onError: (error) => {
            console.log(error);
        },
    });
    // @ts-ignore
    return { saveCrowdsourcedDeal: mutate, ...rest };
}
//# sourceMappingURL=useSaveCrowdsoucedDeal.js.map