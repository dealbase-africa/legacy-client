import { generateTraceId, } from "@dealbase/core";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { config } from "../lib/config";
import { useAuthHeaders } from "./useAuthHeaders";
export var EntryType;
(function (EntryType) {
    EntryType["Deal"] = "deals";
    EntryType["Investor"] = "investors";
    EntryType["Company"] = "companies";
})(EntryType || (EntryType = {}));
export function useDeleteEntry(entryType, onClose) {
    const authHeaders = useAuthHeaders();
    const queryClient = useQueryClient();
    const { mutate, ...rest } = useMutation({
        mutationFn: async (id) => {
            return fetch(`${config.dealbaseApiUrl}/${entryType}/${id}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    "x-trace-id": generateTraceId(),
                    authorization: `Bearer ${config.apiKey}`,
                    ...(authHeaders || {}),
                },
            }).then((res) => res.json());
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["deals", "companies", "investors"],
                type: "active",
            });
            onClose();
        },
        onError: () => {
            // TODO: handle error
        },
    });
    // @ts-ignore
    return { deleteEntry: mutate, ...rest };
}
//# sourceMappingURL=useDeleteEntry.js.map