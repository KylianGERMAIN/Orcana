import {
  findUserWithEmail,
  findUserWithId,
  updateUser,
} from "../../helpers/database/userRequest";
import { ErrorResponse } from "../../helpers/interface/errorInterface";
import { JWT, User } from "../../helpers/interface/userInterface";
import { Token } from "../../helpers/utils";
import { compareRole } from "../../helpers/validator/role";

export async function setRole(authorization: string, id: string, role: string) {
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
  try {
    var token: JWT = (await Token.decodeRefreshToken(
      authorization,
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
    }
  } catch (e: any) {
    _error = e;
  }
  return {
    error: _error,
  };
}
