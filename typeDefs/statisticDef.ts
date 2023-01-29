import { gql } from "apollo-server-express";

const StatisticResponse = gql`
    type NoLongerUsedQueryResponse {
        totalRequest: Int
    }
`;

const Statistic_Mutation = gql`
    type Mutation {
        noLongerUsedQuery(
            month: String
            year: String
            date: String
        ): NoLongerUsedQueryResponse
    }
`;

export const Statistic = [StatisticResponse, Statistic_Mutation];
