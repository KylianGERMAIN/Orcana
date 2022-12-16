import { AuthMutation, AuthQuery } from "./authentification";
import { UserManagementMutation, UserManagementQuery } from "./userManagement";

export const resolvers = {
  Query: {
    defaultPost: () => "Welcome to Orcana",
    ...AuthQuery,
    ...UserManagementQuery,
  },
  Mutation: {
    ...AuthMutation,
    ...UserManagementMutation,
  },
};
