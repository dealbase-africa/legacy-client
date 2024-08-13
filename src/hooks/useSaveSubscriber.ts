import { generateTraceId, ServerResponse } from "@dealbase/core";
import { Subscriber } from "@dealbase/db";
import {
  UseMutateFunction,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { useAuthHeaders } from "./useAuthHeaders";

export function useSaveSubscriber(onClose: () => void): Omit<
  UseMutationResult<ServerResponse, unknown, Subscriber, unknown>,
  "mutate"
> & {
  saveSubscriber: UseMutateFunction<
    ServerResponse,
    unknown,
    Subscriber,
    unknown
  >;
} {
  const authHeaders = useAuthHeaders();
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: async (inputData: Subscriber) => {
      const res = await fetch(`/api/subscribers`, {
        method: "POST",
        body: JSON.stringify(inputData),
        headers: {
          "content-type": "application/json",
          "x-trace-id": generateTraceId(),
          ...(authHeaders || {}),
        },
      });

      if (res.status >= 400) {
        // @ts-ignore
        const { message, stack } = await res.json();
        throw new Error(
          typeof message === "string"
            ? message
            : message?.details || message?.message || stack || "Unknown error",
        );
      }

      return await res.json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["subscribers"],
        type: "active",
      });

      onClose();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // @ts-ignore
  return { saveSubscriber: mutate, ...rest };
}
