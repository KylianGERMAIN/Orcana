import { Encrypt, RequestContext, Token } from "../../helpers/utils";
import { ErrorResponse } from "../../helpers/interface/errorInterface";
import { User } from "../../helpers/interface/userInterface";
import { set_log } from "../log/set_log";
import { HttpInfo, QueryContent } from "../../helpers/interface/logInterface";
import { login_checking } from "../../helpers/validator/login";

export async function login(email: string, password: string, context: any) {
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
        username: "",
        password: password,
        role: "",
        id: "user",
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
        RequestContext.check_operation_name(context.body.operationName);
        const result = await login_checking(user);
        user.id = result._id.toString();
        user.password = await Encrypt.crypt_password(password);
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
