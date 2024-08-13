import {
  Company,
  Deal,
  generateTraceId,
  Investor,
  ServerResponse,
} from "@dealbase/core";
import {
  UseMutateFunction,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { config } from "../lib/config";
import { useAuthHeaders } from "./useAuthHeaders";

export enum EntryType {
  Deal = "deals",
  Investor = "investors",
  Company = "companies",
}

export function useDeleteEntry(
  entryType: EntryType,
  onClose: () => void,
): Omit<
  UseMutationResult<
    ServerResponse<Deal | Company | Investor>,
    unknown,
    number,
    unknown
  >,
  "mutate"
> & {
  deleteEntry: UseMutateFunction<
    ServerResponse<Deal | Company | Investor>,
    unknown,
    number,
    unknown
  >;
} {
  const authHeaders = useAuthHeaders();
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: async (id: number) => {
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
