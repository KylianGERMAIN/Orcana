import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Error {
    message: String
  }

  type AuthResponse {
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
    register(email: String, username: String, password: String): AuthResponse
    login(email: String, password: String): AuthResponse
  }
`;