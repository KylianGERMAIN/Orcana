import { ErrorResponse } from "../../helpers/interface/errorInterface";
import { HttpInfo, QueryContent } from "../../helpers/interface/logInterface";
import { JWT, User } from "../../helpers/interface/userInterface";
import { RequestContext, Token } from "../../helpers/utils";
import { set_log } from "../log/set_log";

export async function refresh_access_token(context: any) {
    const user: User = {
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

    let newToken = "";
    const time = new Date();

    try {
        RequestContext.check_operation_name(context.body.operationName);
        const token: JWT = (await Token.decode_refresh_token(
            context.headers.authorization,
            process.env.REFRESH_TOKEN_SECRET as string
        )) as JWT;
        if (token) {
            user.id = token.payload.id;
            newToken = await Token.generate_access_token(user);
            set_log(time, user.id, "info", _error, query, http_info);
        }
    } catch (e: any) {
        _error = e;
        set_log(time, user.id, "error", _error, query, http_info);
    }
    return {
        error: _error,
        accessToken: newToken,
        expires_in: "1800s",
        tokenType: "Bearer",
    };
}
