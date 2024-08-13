import { Company, ServerResponse } from "@dealbase/core";
import { UseMutateFunction, UseMutationResult } from "@tanstack/react-query";
export declare function useEditCompany(): Omit<UseMutationResult<ServerResponse<Company>, unknown, Company, unknown>, "mutate"> & {
    editCompany: UseMutateFunction<ServerResponse<Company>, unknown, Company, unknown>;
};
