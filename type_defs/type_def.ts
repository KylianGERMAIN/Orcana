import { Basic } from "./basic_def";
import { authentification } from "./authentification_def";
import { user_management } from "./user_management_def";
import { statistic } from "./statistic_def";
import { user_search } from "./user_search_def";
import { chat } from "./chat";

export const typeDefs = [
    Basic,
    authentification,
    user_management,
    statistic,
    user_search,
    chat,
];
