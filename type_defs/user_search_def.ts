const search_response = `#graphql
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

    type user_section {
        user: user
    }
    type user_search_with_id_response {
        data: user_section
        error: Error
    }
`;

const user_search_mutation = `#graphql
    type Mutation {
        user_search(role: String, username: String): user_search_response
        user_search_with_id(user_id: String): user_search_with_id_response
    }
`;

export const user_search = [search_response, user_search_mutation];
