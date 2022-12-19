import { gql } from "apollo-server-express";

const UserManagement_Mutation = gql`
  type Mutation {
    resetPassword(newPassword: String): BasicResponse
    setRole(user_id: String, role: String): BasicResponse
    setUsername(username: String): BasicResponse
  }
`;

const UserManagement_Query = gql`
  type Query {
    deleteAccount: BasicResponse
  }
`;

export const UserManagement = [UserManagement_Mutation, UserManagement_Query];
