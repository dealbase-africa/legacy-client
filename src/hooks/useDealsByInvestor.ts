import { Deal } from "@dealbase/core";
import { useEffect, useState } from "react";
import { useDeals } from "./useDeals";

export const useDealsByInvestor = (investorName: string) => {
  const { deals: allDeals } = useDeals();

  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    if (allDeals) {
      const filteredDeals =
        allDeals.filter((d) =>
          (d.investors.map((i) => i.investor.name) as string[]).includes(
            investorName,
          ),
        ) || [];
      setDeals(filteredDeals);
    }
  }, [allDeals, investorName]);

  return deals;
};
