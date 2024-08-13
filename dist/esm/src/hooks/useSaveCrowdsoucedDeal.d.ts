import { ServerResponse } from "@dealbase/core";
import { CrowdsourcedDeal } from "@dealbase/db";
import { UseMutateFunction, UseMutationResult } from "@tanstack/react-query";
export declare function useSaveCrowdsourcedDeal(onClose: () => void): Omit<UseMutationResult<ServerResponse, unknown, CrowdsourcedDeal, unknown>, "mutate"> & {
    saveCrowdsourcedDeal: UseMutateFunction<ServerResponse, unknown, CrowdsourcedDeal, unknown>;
};
