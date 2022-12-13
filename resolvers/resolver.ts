import { login } from "../middleware/authentification/login";
import { refreshAccessToken } from "../middleware/authentification/refreshAccessToken";
import { register } from "../middleware/authentification/register";
import { resetPassword } from "../middleware/authentification/resetPassword";

const AuthModule = {
  register: async (parent: any, { email, username, password }: any) =>
    register({ email, username, password }),
  login: async (parent: any, { email, password }: any) =>
    login({ email, password }),
  resetPassword: async (parent: any, { newPassword }: any, context: any) =>
    resetPassword(context.authorization, newPassword),
};

export const resolvers = {
  Query: {
    defaultPost: () => "Welcome to Orcana",
    refreshAccessToken: async (parent: any, {}: any, context: any) =>
      refreshAccessToken(context.authorization),
  },
  Mutation: {
    ...AuthModule,
  },
};
