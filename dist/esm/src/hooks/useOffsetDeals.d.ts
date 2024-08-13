import { Deal, Filter } from "@dealbase/core";
import { UseQueryResult } from "@tanstack/react-query";
export declare function useOffsetDeals(filterOverride?: Filter): Omit<UseQueryResult, "refetch" | "data"> & {
    deals: Deal[] | undefined;
    refetchDeals: () => void;
};
