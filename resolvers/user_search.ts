import { user_search } from "../middleware/user_search/user_search";
import { user_search_with_id } from "../middleware/user_search/user_search_with_id";

export const user_search_mutation = {
    user_search: async (parent: never, { role, username }: any, context: any) =>
        user_search(context, role, username),
    user_search_with_id: async (
        parent: never,
        { user_id }: any,
        context: any
    ) => user_search_with_id(context, user_id),
};

export const user_search_query = {};
