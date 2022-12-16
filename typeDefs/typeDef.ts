import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Error {
    message: String
  }

  type BasicResponse {
    error: Error
  }

  type AuthResponse {
    refreshToken: String
    accessToken: String
    expires_in: String
    tokenType: String
    error: Error
  }

  type RefreshAccessTokenResponse {
    accessToken: String
    expires_in: String
    tokenType: String
    error: Error
  }

  type Query {
    defaultPost: String
    refreshAccessToken: RefreshAccessTokenResponse
  }

  type Mutation {
    register(email: String, username: String, password: String): AuthResponse
    login(email: String, password: String): AuthResponse

    resetPassword(newPassword: String): BasicResponse
    setRole(user_id: String, role: String): BasicResponse
  }
`;