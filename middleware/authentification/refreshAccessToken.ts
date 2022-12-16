import { ErrorResponse } from "../../helpers/interface/errorInterface";
import { JWT, User } from "../../helpers/interface/userInterface";
import { Token } from "../../helpers/utils";

export async function refreshAccessToken(authorization: string) {
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

  let newToken: string = "";

  try {
    var token: JWT = (await Token.decodeRefreshToken(
      authorization,
      process.env.REFRESH_TOKEN_SECRET as string
    )) as JWT;
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
