import { gql } from "apollo-server-express";

const StatisticResponse = gql`
    type logs_statistic_response {
        totalRequest: Int
        operation_names: [String]
    }
`;

const Statistic_Mutation = gql`
    type Mutation {
        logs_statistic(
            month: Int
            year: Int
            day: Int
            level: String
        ): logs_statistic_response
    }
`;

export const Statistic = [StatisticResponse, Statistic_Mutation];
