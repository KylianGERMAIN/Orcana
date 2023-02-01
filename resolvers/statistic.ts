import { logs_statistic } from "../middleware/log/no_longer_used_query";

export const StatisticMutation = {
    logs_statistic: async (
        parent: never,
        { month, year, day, level }: any,
        context: any
    ) => logs_statistic(month, year, day, level),
};

export const StatisticQuery = {};
