import { Basic } from "./basic_def";
import { authentification } from "./authentification_def";
import { user_management } from "./user_management_def";
import { statistic } from "./statistic_def";
import { user_search } from "./user_search_def";
import { chat } from "./chat";

const bruh = `#graphql
      type Query {
        currentNumber: Int
      }

      type Subscription {
        numberIncremented: Int
      }
    `;

export const typeDefs = [
    bruh,
    Basic,
    authentification,
    user_management,
    statistic,
    user_search,
    chat,
];
