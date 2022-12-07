import { Encrypt, Token } from "../../helpers/utils";
import { ErrorResponse } from "../../helpers/interface/errorInterface";
import { User } from "../../helpers/interface/userInterface";
import { UserModel } from "../../helpers/models/userModel";
import { registerParsing } from "../../helpers/validator/Indentification";

export async function register({ email, username, password }: any) {
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
  };
  let accesToken: string = "";
  let refreshToken: string = "";

  try {
    user = {
      email: email,
      username: username,
      password: password,
    };
    await registerParsing(user);
    user.password = await Encrypt.cryptPassword(password);
    await new UserModel({
      email: user.email,
      username: user.username,
      password: user.password,
    });
    accesToken = await Token.generateAccessToken(user);
    refreshToken = await Token.generateRefreshToken(user);
  } catch (e: any) {
    _error = e;
  }
  return {
    error: _error,
    refreshToken: refreshToken,
    accessToken: accesToken,
    expires_in: "1800s",
    tokenType: "Bearer",
  };
}
