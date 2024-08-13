import { Company, generateTraceId, ServerResponse } from "@dealbase/core";
import {
  UseMutateFunction,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { config } from "../lib/config";
import { useAuthHeaders } from "./useAuthHeaders";

export function useSaveCompany(): Omit<
  UseMutationResult<ServerResponse<Company>, unknown, Company, unknown>,
  "mutate"
> & {
  saveCompany: UseMutateFunction<
    ServerResponse<Company>,
    unknown,
    Company,
    unknown
  >;
} {
  const authHeaders = useAuthHeaders();
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: async (inputData: Company) => {
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
