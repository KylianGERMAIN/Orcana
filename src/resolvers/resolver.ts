import { UserModel } from "../helpers/models/userModel";
import { register } from "../middleware/authentification/register";

export const resolvers = {
  Query: {
    defaultPost: () => "Welcome to Orcana",
  },
  Mutation: {
    // Authentification
    register: async (parent: any, { email, username, password }: any) =>
      register({ email, username, password }),
    // Authentification
  },
};
