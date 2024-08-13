import { Investor } from "@dealbase/core";
import { UseQueryResult } from "@tanstack/react-query";
export declare function useInvestors(): Omit<UseQueryResult, "refetch" | "data"> & {
    investors: Investor[] | undefined;
    refetchInvestors: () => void;
};
