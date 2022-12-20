import { User } from "../helpers/interface/userInterface";
import { login } from "../middleware/authentification/login";
import { refreshAccessToken } from "../middleware/authentification/refreshAccessToken";
import { register } from "../middleware/authentification/register";

export const AuthMutation = {
  register: async (
    parent: any,
    { email, username, password }: User,
    context: any
  ) => register({ email, username, password }, context),
  login: async (parent: any, { email, password }: User, context: any) =>
    login(email, password, context),
};

export const AuthQuery = {
  refreshAccessToken: async (parent: any, {}, context: any) =>
    refreshAccessToken(context),
};
