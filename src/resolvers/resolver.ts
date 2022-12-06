import { UserModel } from "../helpers/models/userModel";
import { login } from "../helpers/validator/Indentification";
import { register } from "../middleware/authentification/register";

export const resolvers = {
  Query: {
    defaultPost: () => "eat your vegetables",
    getItems: async () => {
      const chats = await UserModel.find({});
      console.log("holt output ======", chats);
      return chats;
    },
  },
  Mutation: {
    // Authentification
    register: async (parent: any, { email, name, password }: any) =>
      register({ email, name, password }),
    // Authentification
  },
};
