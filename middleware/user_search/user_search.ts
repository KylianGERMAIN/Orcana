import { find_user_with_role } from "../../helpers/database/userRequest";
import { ErrorResponse } from "../../helpers/interface/errorInterface";
import { HttpInfo, QueryContent } from "../../helpers/interface/logInterface";
import { JWT, User } from "../../helpers/interface/userInterface";
import { RequestContext, Token } from "../../helpers/utils";
import { set_log } from "../log/set_log";
import { User_search } from "./user_search_class/user_search";

export async function user_search(context: any, role: any) {
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
    const user_search = new User_search(role);
    const users: User[] = [];

    try {
        RequestContext.check_operation_name(context.body.operationName);
        const token: JWT = (await Token.decode_refresh_token(
            context.headers.authorization,
            process.env.REFRESH_TOKEN_SECRET as string
        )) as JWT;
        if (token) {
            user.id = token.payload.id;
            await user_search.check_role();
            const result = await find_user_with_role(role);
            for (let i = 0; i != result.length; i++) {
                const user_data: User = {
                    email: result[i].email,
                    username: result[i].username,
                    password: "",
                    role: "",
                    id: result[i]._id.toString(),
                };
                users.push(user_data);
            }
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
