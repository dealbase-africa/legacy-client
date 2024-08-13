import { ServerResponse } from "@dealbase/core";
import { Subscriber } from "@dealbase/db";
import { UseMutateFunction, UseMutationResult } from "@tanstack/react-query";
export declare function useSaveSubscriber(onClose: () => void): Omit<UseMutationResult<ServerResponse, unknown, Subscriber, unknown>, "mutate"> & {
    saveSubscriber: UseMutateFunction<ServerResponse, unknown, Subscriber, unknown>;
};
