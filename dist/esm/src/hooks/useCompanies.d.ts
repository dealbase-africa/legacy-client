import { Company } from "@dealbase/core";
import { UseQueryResult } from "@tanstack/react-query";
export declare function useCompanies(): Omit<UseQueryResult, "refetch" | "data"> & {
    companies: Company[] | undefined;
    refetchCompanies: () => void;
};
