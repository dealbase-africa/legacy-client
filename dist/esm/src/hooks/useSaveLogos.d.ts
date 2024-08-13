import { Logo, ServerResponse } from "@dealbase/core";
import { UseMutateFunction, UseMutationResult } from "@tanstack/react-query";
export declare function useSaveLogos(): Omit<UseMutationResult<ServerResponse, unknown, Logo[], unknown>, "mutate"> & {
    saveLogos: UseMutateFunction<ServerResponse, unknown, Logo[], unknown>;
};
