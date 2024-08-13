import { useEffect, useState } from "react";
import { useDeals } from "./useDeals";
export const useDealsByInvestor = (investorName) => {
    const { deals: allDeals } = useDeals();
    const [deals, setDeals] = useState([]);
    useEffect(() => {
        if (allDeals) {
            const filteredDeals = allDeals.filter((d) => d.investors.map((i) => i.investor.name).includes(investorName)) || [];
            setDeals(filteredDeals);
        }
    }, [allDeals, investorName]);
    return deals;
};
//# sourceMappingURL=useDealsByInvestor.js.map