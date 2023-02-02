import { gql } from "apollo-server-express";

const user_management_mutation = gql`
    type Mutation {
        reset_password(newPassword: String): basic_response
        set_role(user_id: String, role: String): basic_response
        set_username(username: String): basic_response
    }
`;

const user_management_query = gql`
    type Query {
        delete_account: basic_response
    }
`;

export const user_management = [
    user_management_mutation,
    user_management_query,
];
