import { auth_mutation, auth_query } from "./authentification";
import { statistic_mutation, statistic_query } from "./statistic";
import {
    user_management_mutation,
    user_management_query,
} from "./user_management";
import { user_search_mutation, user_search_query } from "./user_search";

export const resolvers = {
    Query: {
        default_post: () => "Welcome to Orcana",
        ...auth_query,
        ...user_management_query,
        ...statistic_query,
        ...user_search_query,
    },
    Mutation: {
        ...auth_mutation,
        ...user_management_mutation,
        ...statistic_mutation,
        ...user_search_mutation,
    },
};
