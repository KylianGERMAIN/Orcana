import { gql } from "apollo-server-express";

const AuthentificationResponse = gql`
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
`;

const Authentification_Query = gql`
  type Query {
    defaultPost: String
    refreshAccessToken: RefreshAccessTokenResponse
  }
`;

const Authentification_Mutation = gql`
  type Query {
    defaultPost: String
    refreshAccessToken: RefreshAccessTokenResponse
  }

  type Mutation {
    register(email: String, username: String, password: String): AuthResponse
    login(email: String, password: String): AuthResponse
  }
`;

export const Authentification = [
  AuthentificationResponse,
  Authentification_Query,
  Authentification_Mutation,
];
