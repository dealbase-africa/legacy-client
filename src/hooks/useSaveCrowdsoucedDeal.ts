import { generateTraceId, ServerResponse } from "@dealbase/core";
import { CrowdsourcedDeal } from "@dealbase/db";
import {
  UseMutateFunction,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { config } from "../lib/config";
import { useAuthHeaders } from "./useAuthHeaders";

export function useSaveCrowdsourcedDeal(onClose: () => void): Omit<
  UseMutationResult<ServerResponse, unknown, CrowdsourcedDeal, unknown>,
  "mutate"
> & {
  saveCrowdsourcedDeal: UseMutateFunction<
    ServerResponse,
    unknown,
    CrowdsourcedDeal,
    unknown
  >;
} {
  const authHeaders = useAuthHeaders();
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: async (inputData: CrowdsourcedDeal) => {
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
