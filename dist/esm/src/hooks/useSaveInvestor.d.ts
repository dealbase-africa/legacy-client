import { Investor, ServerResponse } from "@dealbase/core";
import { UseMutateFunction, UseMutationResult } from "@tanstack/react-query";
export declare function useSaveInvestor(): Omit<UseMutationResult<ServerResponse, unknown, Investor, unknown>, "mutate"> & {
    saveInvestor: UseMutateFunction<ServerResponse, unknown, Investor, unknown>;
};
