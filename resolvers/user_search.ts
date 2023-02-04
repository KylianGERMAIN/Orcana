import { user_search } from "../middleware/user_search/user_search";

export const user_search_mutation = {
    user_search: async (parent: never, { role }: any, context: any) =>
        user_search(context, role),
};

export const user_search_query = {};
