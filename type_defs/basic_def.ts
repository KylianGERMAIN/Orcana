import { gql } from "apollo-server-express";

const basic_response = gql`
    type Error {
        message: String
    }

    type basic_response {
        error: Error
    }
`;

const basic_query = gql`
    type Query {
        default_post: String
    }
`;

export const Basic = [basic_response, basic_query];
