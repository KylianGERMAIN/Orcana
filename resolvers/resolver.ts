import { auth_mutation, auth_query } from "./authentification";
import { chat_mutation, chat_query } from "./chat";
import { statistic_mutation, statistic_query } from "./statistic";
import {
    user_management_mutation,
    user_management_query,
} from "./user_management";
import { user_search_mutation, user_search_query } from "./user_search";

import { PubSub, withFilter } from "graphql-subscriptions";
import { Token } from "../helpers/utils";
import { JWT } from "../helpers/interface/user_interface";
export const pubsub = new PubSub();

export const resolvers = {
    Query: {
        default_post: () => "Welcome to Orcana !",

        ...auth_query,
        ...user_management_query,
        ...statistic_query,
        ...user_search_query,
        ...chat_query,
    },
    Mutation: {
        ...auth_mutation,
        ...user_management_mutation,
        ...statistic_mutation,
        ...user_search_mutation,
        ...chat_mutation,
    },
    Subscription: {
        chat_subscription: {
            subscribe: withFilter(
                () => pubsub.asyncIterator("CHAT_CREATED"),
                async (payload: any, variables: any, context: any) => {
                    if (context.connectionParams) {
                        const token: JWT = (await Token.decode_token(
                            await context.connectionParams.authorization,
                            process.env.ACCESS_TOKEN_SECRET as string
                        )) as unknown as JWT;
                        if (
                            token.payload.id ==
                            payload.chat_subscription.receiver_id
                        ) {
                            return true;
                        }
                    }
                    return payload;
                }
            ),
        },
    },
};
