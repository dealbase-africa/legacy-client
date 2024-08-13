import { Deal, ServerResponse } from "@dealbase/core";
import { UseMutateFunction, UseMutationResult } from "@tanstack/react-query";
export declare function useEditDeal(onClose: () => void): Omit<UseMutationResult<ServerResponse<Deal>, unknown, Deal, unknown>, "mutate"> & {
    editDeal: UseMutateFunction<ServerResponse<Deal>, unknown, Deal, unknown>;
};
