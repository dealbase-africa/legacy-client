import { generateTraceId } from "@dealbase/core";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { config } from "../lib/config";
import { useAuthHeaders } from "./useAuthHeaders";
export function useSaveDeal(onClose) {
    const authHeaders = useAuthHeaders();
    const queryClient = useQueryClient();
    const { mutate, ...rest } = useMutation({
        mutationFn: async (inputData) => {
            const res = await fetch(`${config.dealbaseApiUrl}/deals`, {
                method: "POST",
                body: JSON.stringify([inputData]),
                headers: {
                    "x-trace-id": generateTraceId(),
                    "content-type": "application/json",
                    authorization: `Bearer ${config.apiKey}`,
                    ...(authHeaders || {}),
                },
            });
            if (res.status >= 400) {
                // @ts-ignore
                const { message, stack } = await res.json();
                throw new Error(typeof message === "string"
                    ? message
                    : message?.message || stack || "Unknown error");
            }
            return await res.json();
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["deals", "companies", "investors"],
                type: "active",
            });
            onClose();
        },
        onError: (error) => {
            console.log(error);
        },
    });
    // @ts-ignore
    return { saveDeal: mutate, ...rest };
}
//# sourceMappingURL=useSaveDeal.js.map