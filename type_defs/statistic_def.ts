const statistic_response = `#graphql
    type logs_statistic_response {
        total_request: Int
        operationName: [String]
        error: Error
    }
`;

const statistic_mutation = `#graphql
  type Mutation {
    logs_statistic(
      month: Int
      year: Int
      day: Int
      level: String
    ): logs_statistic_response
  }
`;

export const statistic = [statistic_response, statistic_mutation];
