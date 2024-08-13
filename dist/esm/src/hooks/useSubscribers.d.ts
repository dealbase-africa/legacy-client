import { Subscriber } from "@dealbase/db";
import { UseQueryResult } from "@tanstack/react-query";
export declare function useSubscribers(): Omit<UseQueryResult, "refetch" | "data"> & {
    subscribers: Subscriber[] | undefined;
    refetchSubscribers: () => void;
};
