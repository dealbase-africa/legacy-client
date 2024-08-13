import { generateTraceId } from "@dealbase/core";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { config } from "../lib/config";
import { useAuthHeaders } from "./useAuthHeaders";
export function useEditInvestor(onClose) {
    const authHeaders = useAuthHeaders();
    const queryClient = useQueryClient();
    const { mutate, ...rest } = useMutation({
        mutationFn: async (inputData) => {
            return fetch(`${config.dealbaseApiUrl}/investors`, {
                method: "PATCH",
                body: JSON.stringify(inputData),
                headers: {
                    "content-type": "application/json",
                    "x-trace-id": generateTraceId(),
                    authorization: `Bearer ${config.apiKey}`,
                    ...(authHeaders || {}),
                },
            }).then((res) => res.json());
        },
        // @ts-ignore
        onSuccess: async ({ investor }) => {
            await queryClient.invalidateQueries({
                queryKey: ["investors"],
                type: "active",
            });
            onClose();
            console.log(investor);
        },
        onError: (error) => {
            console.log(error);
        },
    });
    // @ts-ignore
    return { editInvestor: mutate, ...rest };
}
//# sourceMappingURL=useEditInvestor.js.map