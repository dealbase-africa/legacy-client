import { CrowdsourcedDeal } from "@dealbase/db";
import { UseQueryResult } from "@tanstack/react-query";
export declare function useCrowdsourcedDeals(): Omit<UseQueryResult, "refetch" | "data"> & {
    crowdsourced_deals: CrowdsourcedDeal[] | undefined;
    refetchDeals: () => void;
};
