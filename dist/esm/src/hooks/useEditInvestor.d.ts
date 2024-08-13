import { Investor, ServerResponse } from "@dealbase/core";
import { UseMutateFunction, UseMutationResult } from "@tanstack/react-query";
export declare function useEditInvestor(onClose: () => void): Omit<UseMutationResult<ServerResponse<Investor>, unknown, Investor, unknown>, "mutate"> & {
    editInvestor: UseMutateFunction<ServerResponse<Investor>, unknown, Investor, unknown>;
};
