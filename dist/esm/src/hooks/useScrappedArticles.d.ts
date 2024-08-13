import { UseQueryResult } from "@tanstack/react-query";
export declare function useScrappedArticles(number?: number, unit?: string): Omit<UseQueryResult, "data"> & {
    sources: any[] | undefined;
};
