import { generateTraceId, Investor, ServerResponse } from "@dealbase/core";
import {
  UseMutateFunction,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { config } from "../lib/config";
import { useAuthHeaders } from "./useAuthHeaders";

export function useSaveInvestor(): Omit<
  UseMutationResult<ServerResponse, unknown, Investor, unknown>,
  "mutate"
> & {
  saveInvestor: UseMutateFunction<ServerResponse, unknown, Investor, unknown>;
} {
  const authHeaders = useAuthHeaders();
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: async (inputData: Investor) => {
      return fetch(`${config.dealbaseApiUrl}/investors`, {
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
        queryKey: ["investors"],
        type: "active",
      });
    },
  });

  // @ts-ignore
  return { saveInvestor: mutate, ...rest };
}
