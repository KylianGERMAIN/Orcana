import { GraphQLError } from "graphql";
import {
  findUserWithEmail,
  findUserWithId,
  updateUser,
} from "../../helpers/database/userRequest";
import { ErrorResponse } from "../../helpers/interface/errorInterface";
import { JWT, User } from "../../helpers/interface/userInterface";
import { Token } from "../../helpers/utils";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export async function setUsername(authorization: string, name: string) {
  let user: User = {
    email: "",
    username: "",
    password: "",
    role: "",
    id: "",
  };
  let _error: ErrorResponse = {
    message: "",
    extensions: {
      status: 0,
      error: "",
      field: "",
    },
  };
  try {
    if (!name || name.length < 6) {
      throw new GraphQLError("username does not exist or is too short", {
        extensions: {
          status: StatusCodes.FORBIDDEN,
          error: ReasonPhrases.FORBIDDEN,
          field: "username",
        },
      });
    }
    var token: JWT = (await Token.decodeRefreshToken(
      authorization,
      process.env.ACCESS_TOKEN_SECRET as string
    )) as JWT;
    if (token) {
      user.email = token.payload.email;
      const res: any = await findUserWithEmail(user);
      await updateUser({ email: res.email }, { username: name });
    }
  } catch (e: any) {
    _error = e;
  }
  return {
    error: _error,
  };
}
