import { ErrorResponse } from "../../helpers/interface/errorInterface";
import { JWT, User } from "../../helpers/interface/userInterface";
import { RequestContext, Token } from "../../helpers/utils";
import { HttpInfo, QueryContent } from "../../helpers/interface/logInterface";
import { set_log } from "../log/set_log";
import { delete_user } from "../../helpers/database/userRequest";
import { User_management } from "./user_management_class/user_management";

export async function delete_account(context: any) {
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

    const time = new Date();
    const user_management = new User_management(user);

    try {
        RequestContext.check_operation_name(context.body.operationName);
        const token: JWT = (await Token.decode_refresh_token(
            context.headers.authorization,
            process.env.ACCESS_TOKEN_SECRET as string
        )) as JWT;
        if (token) {
            user_management.user.id = token.payload.id;
            await delete_user({ _id: user_management.user.id });
            set_log(
                time,
                user_management.user.id,
                "info",
                _error,
                query,
                http_info
            );
        }
    } catch (e: any) {
        _error = e;
        set_log(
            time,
            user_management.user.id,
            "error",
            _error,
            query,
            http_info
        );
    }
    return {
        error: _error,
    };
}
