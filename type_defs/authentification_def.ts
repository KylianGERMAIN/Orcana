import { gql } from "apollo-server-express";

const authentification_response = gql`
    type auth_response {
        refresh_token: String
        access_token: String
        expires_in: String
        token_type: String
        error: Error
    }

    type refresh_access_token_response {
        access_token: String
        expires_in: String
        token_type: String
        error: Error
    }
`;

const authentification_query = gql`
    type Query {
        default_post: String
        refresh_access_token: refresh_access_token_response
    }
`;

const authentification_mutation = gql`
    type Mutation {
        register(
            email: String
            username: String
            password: String
        ): auth_response
        login(email: String, password: String): auth_response
    }
`;

export const authentification = [
    authentification_response,
    authentification_query,
    authentification_mutation,
];
