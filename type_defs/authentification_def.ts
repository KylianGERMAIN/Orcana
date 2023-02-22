const authentification_response = `#graphql
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

const authentification_query = `#graphql
    type Query {
        default_post: String
        refresh_access_token: refresh_access_token_response
    }
`;

const authentification_mutation = `#graphql
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
