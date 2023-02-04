import { gql } from "apollo-server-express";

const search_response = gql`
    type user {
        id: String
        email: String
        username: String
    }
    type user_list {
        users: [user]
    }
    type user_search_response {
        data: user_list
        error: Error
    }
`;

const user_search_mutation = gql`
    type Mutation {
        user_search(role: String): user_search_response
    }
`;

export const user_search = [search_response, user_search_mutation];
