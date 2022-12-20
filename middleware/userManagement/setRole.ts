import { findUserWithId, updateUser } from "../../helpers/database/userRequest";
import { ErrorResponse } from "../../helpers/interface/errorInterface";
import { HttpInfo, QueryContent } from "../../helpers/interface/logInterface";
import { JWT, User } from "../../helpers/interface/userInterface";
import { Token } from "../../helpers/utils";
import { compareRole } from "../../helpers/validator/role";
import { setLog } from "../log/setLog";

export async function setRole(context: any, id: string, role: string) {
  let user: User = {
    email: "",
    username: "",
    password: "",
    role: "",
    id: "",
  };
  let toUser: User = {
    email: "",
    username: "",
    password: "",
    role: role,
    id: id,
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

  var time = new Date();

  try {
    var token: JWT = (await Token.decodeRefreshToken(
      context.headers.authorization,
      process.env.ACCESS_TOKEN_SECRET as string
    )) as JWT;
    if (token) {
      user.id = token.payload.id;
      const userIn: any = await findUserWithId(user);
      user.role = userIn.role;
      const userOut: any = await findUserWithId(toUser);
      toUser.email = userOut.email;
      await compareRole(user.role, toUser.role);
      await updateUser({ email: toUser.email }, { role: toUser.role });
      setLog(time, user.id, "info", _error, query, http_info);
    }
  } catch (e: any) {
    _error = e;
    setLog(time, user.id, "error", _error, query, http_info);
  }
  return {
    error: _error,
  };
}
