import { generateTraceId, Logo, ServerResponse } from "@dealbase/core";
import {
  UseMutateFunction,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { config } from "../lib/config";
import { useAuthHeaders } from "./useAuthHeaders";

export function useSaveLogos(): Omit<
  UseMutationResult<ServerResponse, unknown, Logo[], unknown>,
  "mutate"
> & {
  saveLogos: UseMutateFunction<ServerResponse, unknown, Logo[], unknown>;
} {
  const authHeaders = useAuthHeaders();
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: async (inputData: Logo[]) => {
      const res = await fetch(`${config.dealbaseApiUrl}/logos`, {
        method: "POST",
        body: JSON.stringify(inputData),
        headers: {
          "content-type": "application/json",
          "x-trace-id": generateTraceId(),
          authorization: `Bearer ${config.apiKey}`,
          ...(authHeaders || {}),
        },
      });
      if (res.status >= 400) {
        // @ts-ignore
        const { message, stack } = await res.json();
        throw new Error(
          typeof message === "string"
            ? message
            : message?.message || stack || "Unknown error",
        );
      }
      return await res.json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["logos"],
        type: "active",
      });
    },
  });

  // @ts-ignore
  return { saveLogos: mutate, ...rest };
}
