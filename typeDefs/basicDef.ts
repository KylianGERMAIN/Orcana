import { gql } from "apollo-server-express";

const BasicResponse = gql`
  type Error {
    message: String
  }

  type BasicResponse {
    error: Error
  }
`;

const Basic_Query = gql`
  type Query {
    defaultPost: String
  }
`;

export const Basic = [BasicResponse, Basic_Query];
