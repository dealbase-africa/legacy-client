import { Deal } from "@dealbase/core";
import { UseQueryResult } from "@tanstack/react-query";
export declare function useDeals(): Omit<UseQueryResult, "refetch" | "data"> & {
    deals: Deal[] | undefined;
    refetchDeals: () => void;
};
