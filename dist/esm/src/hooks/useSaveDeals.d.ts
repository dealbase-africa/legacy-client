import { Company, Deal, PressRelease, ServerResponse } from "@dealbase/core";
import { UseMutateFunction, UseMutationResult } from "@tanstack/react-query";
export type DatabaseDealFromCSV = Omit<Deal, "pressRelease" | "id" | "company"> & {
    pressRelease: Omit<PressRelease, "date"> & {
        date: Date | null;
    };
    company: Omit<Company, "id" | "sector" | "sectors" | "createdAt"> & {
        sectors: string;
    };
};
export declare function useSaveDeals(onClose: () => void): Omit<UseMutationResult<ServerResponse<Deal>, unknown, DatabaseDealFromCSV[], unknown>, "mutate"> & {
    saveDeals: UseMutateFunction<ServerResponse<Deal>, unknown, DatabaseDealFromCSV[], unknown>;
};
