import { ErrorResponse } from "../../helpers/interface/errorInterface";
import { HttpInfo, QueryContent } from "../../helpers/interface/logInterface";
import { JWT, User } from "../../helpers/interface/userInterface";
import { Token } from "../../helpers/utils";
import { setLog } from "../log/setLog";

export async function refreshAccessToken(context: any) {
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

  let http_info: HttpInfo = {
    status: "200",
    url: context.originalUrl ? context.originalUrl : "",
    ip: "",
    method: context.method ? context.method : "",
  };

  let query: QueryContent = {
    operationName: context.body.operationName ? context.body.operationName : "",
    query: context.body.query ? context.body.query : "",
  };

  let newToken: string = "";
  var time = new Date();

  try {
    var token: JWT = (await Token.decodeRefreshToken(
      context.headers.authorization,
      process.env.REFRESH_TOKEN_SECRET as string
    )) as JWT;
    if (token) {
      user.id = token.payload.id;
      newToken = await Token.generateAccessToken(user);
      setLog(time, user.id, "info", _error, query, http_info);
    }
  } catch (e: any) {
    _error = e;
    setLog(time, user.id, "error", _error, query, http_info);
  }
  return {
    error: _error,
    accessToken: newToken,
    expires_in: "1800s",
    tokenType: "Bearer",
  };
}
