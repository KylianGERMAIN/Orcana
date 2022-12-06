import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Item {
    email: String
    name: String
    password: String
  }

  type Error {
    message: String
  }

  type ItemResponse {
    item: Item
    error: Error
  }

  type Query {
    defaultPost: String
    getItems: [Item]
  }

  type Mutation {
    register(email: String, name: String, password: String): ItemResponse
  }
`;