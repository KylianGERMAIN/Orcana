import { gql } from "apollo-server-express";

const statistic_response = gql`
    type logs_statistic_response {
        total_request: Int
        operationName: [String]
        error: Error
    }
`;

const statistic_mutation = gql`
    type Mutation {
        logs_statistic(
            month: Int
            year: Int
            day: Int
            level: String
        ): logs_statistic_response
    }
`;

const statistic_subscription = gql`
    type Subscription {
        numberIncremented: Int
    }
`;

export const statistic = [
    statistic_response,
    statistic_mutation,
    statistic_subscription,
];
