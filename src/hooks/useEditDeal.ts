import { Deal, generateTraceId, ServerResponse } from "@dealbase/core";
import {
  UseMutateFunction,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { config } from "../lib/config";
import { useAuthHeaders } from "./useAuthHeaders";

export function useEditDeal(onClose: () => void): Omit<
  UseMutationResult<ServerResponse<Deal>, unknown, Deal, unknown>,
  "mutate"
> & {
  editDeal: UseMutateFunction<ServerResponse<Deal>, unknown, Deal, unknown>;
} {
  const authHeaders = useAuthHeaders();
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: async (inputData: Deal) => {
      return fetch(`${config.dealbaseApiUrl}/deals`, {
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
  return { editDeal: mutate, ...rest };
}
