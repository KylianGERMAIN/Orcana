import { Encrypt, RequestContext, Token } from "../../helpers/utils";
import { ErrorResponse } from "../../helpers/interface/errorInterface";
import { User } from "../../helpers/interface/userInterface";
import { UserModel } from "../../helpers/models/userModel";
import { register_checking } from "../../helpers/validator/register";
import { HttpInfo, QueryContent } from "../../helpers/interface/logInterface";
import { set_log } from "../log/set_log";
import { find_user_with_email } from "../../helpers/database/userRequest";

export async function register(
    { email, username, password }: User,
    context: any
) {
    let _error: ErrorResponse = {
        message: "",
        extensions: {
            status: 0,
            error: "",
            field: "",
        },
    };
    const user: User = {
        email: email,
        username: username,
        password: password,
        role: "user",
        id: "",
    };

    const http_info: HttpInfo = {
        status: "200",
        url: context.originalUrl ? context.originalUrl : "",
        ip: "",
        method: context.method ? context.method : "",
    };

    const query: QueryContent = {
        operationName: context.body.operationName
            ? context.body.operationName
            : "",
        query: context.body.query ? context.body.query : "",
    };

    let acces_token = "";
    let refresh_token = "";

    const time = new Date();

    try {
        await RequestContext.check_operation_name(context.body.operationName);
        await register_checking(user);
        user.password = await Encrypt.crypt_password(password);
        const newUser = await new UserModel({
            email: user.email,
            username: user.username,
            password: user.password,
            role: user.role,
        });
        await newUser.save();
        const res: any = await find_user_with_email(user);
        user.id = res._id.toString();
        acces_token = await Token.generate_access_token(user);
        refresh_token = await Token.generate_refresh_token(user);
        set_log(time, user.id, "info", _error, query, http_info);
    } catch (e: any) {
        _error = e;
        set_log(time, user.id, "error", _error, query, http_info);
    }
    return {
        error: _error,
        refresh_token: refresh_token,
        access_token: acces_token,
        expires_in: "1800s",
        token_type: "Bearer",
    };
}
