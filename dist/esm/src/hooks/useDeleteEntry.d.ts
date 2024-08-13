import { Company, Deal, Investor, ServerResponse } from "@dealbase/core";
import { UseMutateFunction, UseMutationResult } from "@tanstack/react-query";
export declare enum EntryType {
    Deal = "deals",
    Investor = "investors",
    Company = "companies"
}
export declare function useDeleteEntry(entryType: EntryType, onClose: () => void): Omit<UseMutationResult<ServerResponse<Deal | Company | Investor>, unknown, number, unknown>, "mutate"> & {
    deleteEntry: UseMutateFunction<ServerResponse<Deal | Company | Investor>, unknown, number, unknown>;
};
