import { GraphQLError } from "graphql";
import { ReasonPhrases } from "http-status-codes/build/cjs/reason-phrases";
import { StatusCodes } from "http-status-codes/build/cjs/status-codes";
import {
  deleteUser,
  findUserWithId,
  updateUser,
} from "../../helpers/database/userRequest";
import { ErrorResponse } from "../../helpers/interface/errorInterface";
import { JWT, User } from "../../helpers/interface/userInterface";
import { Encrypt, Token } from "../../helpers/utils";

export async function deleteAccount(authorization: string) {
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
    var token: JWT = (await Token.decodeRefreshToken(
      authorization,
      process.env.ACCESS_TOKEN_SECRET as string
    )) as JWT;
    if (token) {
      user.id = token.payload.id;
      await deleteUser({ _id: user.id });
    }
  } catch (e: any) {
    _error = e;
  }
  return {
    error: _error,
  };
}
