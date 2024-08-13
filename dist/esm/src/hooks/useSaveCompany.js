import { generateTraceId } from "@dealbase/core";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { config } from "../lib/config";
import { useAuthHeaders } from "./useAuthHeaders";
export function useSaveCompany() {
    const authHeaders = useAuthHeaders();
    const queryClient = useQueryClient();
    const { mutate, ...rest } = useMutation({
        mutationFn: async (inputData) => {
            return fetch(`${config.dealbaseApiUrl}/companies`, {
                method: "POST",
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
        onSuccess: async ({ data }) => {
            await queryClient.invalidateQueries({
                queryKey: ["companies"],
                type: "active",
            });
            console.log(data);
        },
        onError: (error) => {
            console.log(error);
        },
    });
    // @ts-ignore
    return { saveCompany: mutate, ...rest };
}
//# sourceMappingURL=useSaveCompany.js.map