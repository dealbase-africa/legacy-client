import { max } from "date-fns";
import { useDeals } from "./useDeals";

export const useLastUpdateDate = () => {
  const { deals } = useDeals();

  const dealDatesArray = deals?.map((d) => new Date(d.createdAt ?? "")) ?? [];

  return max(dealDatesArray.length > 0 ? dealDatesArray : [new Date()]);
};
