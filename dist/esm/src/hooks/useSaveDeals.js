import { generateTraceId, } from "@dealbase/core";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { useAuthHeaders } from "./useAuthHeaders";
export function useSaveDeals(onClose) {
    const authHeaders = useAuthHeaders();
    const queryClient = useQueryClient();
    const { mutate, ...rest } = useMutation({
        mutationFn: async (inputData) => {
            console.log("inputData:>>", inputData);
            const res = await fetch(`/api/deals`, {
                method: "POST",
                body: JSON.stringify(inputData),
                headers: {
                    "x-trace-id": generateTraceId(),
                    "content-type": "application/json",
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
            console.log("An error occurred while saving deals", error);
        },
    });
    // @ts-ignore
    return { saveDeals: mutate, ...rest };
}
//# sourceMappingURL=useSaveDeals.js.map