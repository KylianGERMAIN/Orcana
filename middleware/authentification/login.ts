import { Encrypt, Token } from "../../helpers/utils";
import { ErrorResponse } from "../../helpers/interface/errorInterface";
import { User } from "../../helpers/interface/userInterface";
import { UserModel } from "../../helpers/models/userModel";
import { loginChecking } from "../../helpers/validator/Indentification";

export async function login({ email, password }: any) {
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
    user = {
      id: "",
      email: email,
      username: "",
      password: password,
      role: "user",
    };
    await loginChecking(user);
    user.password = await Encrypt.cryptPassword(password);
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
