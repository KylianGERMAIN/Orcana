import { ErrorResponse } from "../../helpers/interface/errorInterface";
import { HttpInfo, QueryContent } from "../../helpers/interface/logInterface";
import { JWT, User } from "../../helpers/interface/userInterface";
import { RequestContext, Token } from "../../helpers/utils";
import { set_log } from "../log/set_log";
import { User_search } from "./user_search_class/user_search";

export async function user_search(
    context: any,
    role: string,
    username: string
) {
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
    const user_search = new User_search(role, username);
    let users: User[] = [];

    try {
        RequestContext.check_operation_name(context.body.operationName);
        const token: JWT = (await Token.decode_refresh_token(
            context.headers.authorization,
            process.env.REFRESH_TOKEN_SECRET as string
        )) as JWT;
        if (token) {
            user.id = token.payload.id;
            if (role && username) {
                await user_search.check_role();
                users = await user_search.search_user_with_username_and_role();
            } else if (role) {
                await user_search.check_role();
                users = await user_search.search_user_with_role();
            } else users = await user_search.search_user_with_username();
            set_log(time, user.id, "info", _error, query, http_info);
        }
    } catch (e: any) {
        _error = e;
        set_log(time, user.id, "error", _error, query, http_info);
    }
    return {
        error: _error,
        data: { users: users },
    };
}
