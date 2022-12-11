import { ErrorResponse } from "../../helpers/interface/errorInterface";
import { JWT, User } from "../../helpers/interface/userInterface";
import { Token } from "../../helpers/utils";

export async function refreshAccessToken(authorization: any) {
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

  let newToken: string = "";

  try {
    var token: JWT = (await Token.decodeRefreshToken(authorization)) as JWT;
    if (token) {
      user.email = token.payload.email;
      newToken = await Token.generateAccessToken(user);
    }
  } catch (e: any) {
    _error = e;
  }
  return {
    error: _error,
    accessToken: newToken,
    expires_in: "1800s",
    tokenType: "Bearer",
  };
}
