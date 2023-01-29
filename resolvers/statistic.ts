import { noLongerUsedQuery } from "../middleware/log/noLongerUsedQuery";

export const StatisticMutation = {
    noLongerUsedQuery: async (
        parent: never,
        { month, year, date }: any,
        context: any
    ) => noLongerUsedQuery(),
};

export const StatisticQuery = {};
