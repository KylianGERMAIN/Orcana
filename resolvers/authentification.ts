import { User } from "../helpers/interface/userInterface";
import { login } from "../middleware/authentification/login";
import { refresh_access_token } from "../middleware/authentification/refresh_access_token";
import { register } from "../middleware/authentification/register";

export const auth_mutation = {
  register: async (
    parent: never,
    { email, username, password }: User,
    context: any
  ) => register({ email, username, password }, context),
  login: async (parent: never, { email, password }: User, context: any) =>
    login(email, password, context),
};

export const auth_query = {
  refresh_access_token: async (parent: never, values: never, context: any) =>
    refresh_access_token(context),
};
