import {
  Company,
  Deal,
  PressRelease,
  ServerResponse,
  generateTraceId,
} from "@dealbase/core";
import {
  UseMutateFunction,
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useAuthHeaders } from "./useAuthHeaders";

export type DatabaseDealFromCSV = Omit<
  Deal,
  "pressRelease" | "id" | "company"
> & {
  pressRelease: Omit<PressRelease, "date"> & {
    date: Date | null;
  };
  company: Omit<Company, "id" | "sector" | "sectors" | "createdAt"> & {
    sectors: string;
  };
};

export function useSaveDeals(onClose: () => void): Omit<
  UseMutationResult<
    ServerResponse<Deal>,
    unknown,
    DatabaseDealFromCSV[],
    unknown
  >,
  "mutate"
> & {
  saveDeals: UseMutateFunction<
    ServerResponse<Deal>,
    unknown,
    DatabaseDealFromCSV[],
    unknown
  >;
} {
  const authHeaders = useAuthHeaders();
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: async (inputData: DatabaseDealFromCSV[]) => {
      console.log("inputData:>>", inputData);
      const res = await fetch(`/api/deals`, {
        method: "POST",
        body: JSON.stringify(inputData),
        headers: {
          "x-trace-id": generateTraceId(),
          "content-type": "application/json",
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
        queryKey: ["deals", "companies", "investors"],
        type: "active",
      });

      onClose();
    },
    onError: (error) => {
      console.log("An error occurred while saving deals", error);
    },
  });

  // @ts-ignore
  return { saveDeals: mutate, ...rest };
}
