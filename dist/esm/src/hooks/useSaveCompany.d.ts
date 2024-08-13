import { Company, ServerResponse } from "@dealbase/core";
import { UseMutateFunction, UseMutationResult } from "@tanstack/react-query";
export declare function useSaveCompany(): Omit<UseMutationResult<ServerResponse<Company>, unknown, Company, unknown>, "mutate"> & {
    saveCompany: UseMutateFunction<ServerResponse<Company>, unknown, Company, unknown>;
};
