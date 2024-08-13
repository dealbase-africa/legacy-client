import { Logo } from "@dealbase/core";
import { UseQueryResult } from "@tanstack/react-query";
export type CompaniesFilterType = Partial<Record<keyof Logo, string | number>>;
export declare function useLogos(): Omit<UseQueryResult, "refetch" | "data"> & {
    logos: Logo[] | undefined;
    refetchLogos: () => void;
};
