import { validMail } from "../../tools/inputTools";
import { GraphQLError } from "graphql";

export function login(email: string, name: string, password: string) {
  if (!validMail(email)) {
    throw new GraphQLError("Your email is not valid", {
      extensions: {
        status: "400",
        error: "Bad Request",
        field: "Email",
      },
    });
  }
}
