import { AuthMutation, AuthQuery } from "./authentification";
import { StatisticMutation, StatisticQuery } from "./statistic";
import { UserManagementMutation, UserManagementQuery } from "./userManagement";

export const resolvers = {
    Query: {
        defaultPost: () => "Welcome to Orcana",
        ...AuthQuery,
        ...UserManagementQuery,
        ...StatisticQuery,
    },
    Mutation: {
        ...AuthMutation,
        ...UserManagementMutation,
        ...StatisticMutation,
    },
};
