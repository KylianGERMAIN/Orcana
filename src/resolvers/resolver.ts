import { login } from "../middleware/authentification/login";
import { refreshAccessToken } from "../middleware/authentification/refreshAccessToken";
import { register } from "../middleware/authentification/register";

const AuthModule = {
  register: async (parent: any, { email, username, password }: any) =>
    register({ email, username, password }),
  login: async (parent: any, { email, password }: any) =>
    login({ email, password }),
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
