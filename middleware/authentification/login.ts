import { Encrypt, Token } from "../../helpers/utils";
import { ErrorResponse } from "../../helpers/interface/errorInterface";
import { User } from "../../helpers/interface/userInterface";
import { UserModel } from "../../helpers/models/userModel";
import { loginChecking } from "../../helpers/validator/Indentification";
import { setLog } from "../log/setLog";
import { stat } from "fs";

export async function login(email: any, password: any, context: any) {
  let _error: ErrorResponse = {
    message: "",
    extensions: {
      status: 0,
      error: "",
      field: "",
    },
  };
  let user: User = {
    email: "",
    username: "",
    password: "",
    role: "",
    id: "",
  };

  let accesToken: string = "";
  let refreshToken: string = "";

  try {
    var time = new Date();
    user = {
      id: "",
      email: email,
      username: "",
      password: password,
      role: "user",
    };
    const result = await loginChecking(user);
    user.id = result._id.toString();
    user.password = await Encrypt.cryptPassword(password);
    accesToken = await Token.generateAccessToken(user);
    refreshToken = await Token.generateRefreshToken(user);
    setLog(
      time,
      user.id,
      "info",
      _error,
      { operationName: context.body.operationName, query: context.body.query },
      {
        status: "200",
        url: context.originalUrl,
        ip: context.socket.remoteAddress,
        method: context.method,
      }
    );
  } catch (e: any) {
    _error = e;
    setLog(
      new Date(),
      "",
      "info",
      _error,
      { operationName: context.body.operationName, query: context.body.query },
      {
        status: "200",
        url: context.originalUrl,
        ip: "20",
        method: context.method,
      }
    );
  }
  return {
    error: _error,
    refreshToken: refreshToken,
    accessToken: accesToken,
    expires_in: "1800s",
    tokenType: "Bearer",
  };
}
