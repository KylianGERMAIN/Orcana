// import { pubsub } from "..";
import { auth_mutation, auth_query } from "./authentification";
import { chat_mutation } from "./chat";
import { statistic_mutation, statistic_query } from "./statistic";
import {
    user_management_mutation,
    user_management_query,
} from "./user_management";
import { user_search_mutation, user_search_query } from "./user_search";

import { PubSub } from "graphql-subscriptions";
export const pubsub = new PubSub();

export const resolvers = {
    Query: {
        default_post: () => "Welcome to Orcana !",
        currentNumber() {
            return 0;
        },

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
        ...chat_mutation,
    },
    Subscription: {
        numberIncremented: {
            subscribe: () => pubsub.asyncIterator(["NUMBER_INCREMENTED"]),
        },
    },
};

let currentNumber = 0;
function incrementNumber() {
    currentNumber++;
    pubsub.publish("NUMBER_INCREMENTED", {
        numberIncremented: currentNumber,
    });
    setTimeout(incrementNumber, 100);
}

// Start incrementing
incrementNumber();
