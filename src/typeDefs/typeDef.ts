import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Data {
    email: String
    username: String
    password: String
  }

  type Error {
    message: String
  }

  type RegisterResponse {
    # data: Data
    refreshToken: String
    accessToken: String
    expires_in: String
    tokenType: String
    error: Error
  }

  type Query {
    defaultPost: String
  }

  type Mutation {
    register(
      email: String
      username: String
      password: String
    ): RegisterResponse
  }
`;