import { GraphQLError } from "graphql";
import { ReasonPhrases } from "http-status-codes/build/cjs/reason-phrases";
import { StatusCodes } from "http-status-codes/build/cjs/status-codes";
import { findUser, updateUser } from "../../helpers/database/userRequest";
import { ErrorResponse } from "../../helpers/interface/errorInterface";
import { JWT, User } from "../../helpers/interface/userInterface";
import { Encrypt, Token } from "../../helpers/utils";

export async function resetPassword(
  authorization: string,
  newPassword: string
) {
  let user: User = {
    email: "",
    username: "",
    password: "",
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
      user.email = token.payload.email;
      const res: any = await findUser(user);
      console.log(await Encrypt.comparePassword(newPassword, res.password));
      if (await Encrypt.comparePassword(newPassword, res.password)) {
        throw new GraphQLError(
          "You change the password with the same password",
          {
            extensions: {
              status: StatusCodes.FORBIDDEN,
              error: ReasonPhrases.FORBIDDEN,
              field: "password",
            },
          }
        );
      } else {
        user.password = await Encrypt.cryptPassword(newPassword);
        await updateUser({ email: user.email }, { password: user.password });
      }
    }
  } catch (e: any) {
    _error = e;
  }
  return {
    error: _error,
  };
}
