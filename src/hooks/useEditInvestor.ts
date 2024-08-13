import { generateTraceId, Investor, ServerResponse } from "@dealbase/core";
import {
  UseMutateFunction,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { config } from "../lib/config";
import { useAuthHeaders } from "./useAuthHeaders";

export function useEditInvestor(onClose: () => void): Omit<
  UseMutationResult<ServerResponse<Investor>, unknown, Investor, unknown>,
  "mutate"
> & {
  editInvestor: UseMutateFunction<
    ServerResponse<Investor>,
    unknown,
    Investor,
    unknown
  >;
} {
  const authHeaders = useAuthHeaders();
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: async (inputData: Investor) => {
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
