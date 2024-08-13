import { Deal, ServerResponse } from "@dealbase/core";
import { UseMutateFunction, UseMutationResult } from "@tanstack/react-query";
type DealFromForm = Omit<Deal, "investors"> & {
    investors: string;
};
export declare function useSaveDeal(onClose: () => void): Omit<UseMutationResult<ServerResponse<Deal>, unknown, DealFromForm, unknown>, "mutate"> & {
    saveDeal: UseMutateFunction<ServerResponse<Deal>, unknown, DealFromForm, unknown>;
};
export {};
