import { ErrorResponse } from "../../helpers/interface/error_interface";
import { HttpInfo, QueryContent } from "../../helpers/interface/log_interface";
import { JWT, IUser } from "../../helpers/interface/user_interface";
import { RequestContext, Token } from "../../helpers/utils";
import { Database } from "../../helpers/database/database";

export async function user_search_with_id(context: any, user_id: string) {
    const user: IUser = {
        email: "",
        username: "",
        password: "",
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
    const db = new Database();
    let result;

    try {
        RequestContext.check_operation_name(context.body.operationName);
        const token: JWT = (await Token.decode_token(
            context.headers.authorization,
            process.env.ACCESS_TOKEN_SECRET as string
        )) as unknown as JWT;
        if (token) {
            user.id = token.payload.id;
            result = await db.find_user_with_id({
                email: "",
                username: "",
                password: "",
                id: user_id,
            });
            db.set_log(time, user.id, "info", _error, query, http_info);
        }
    } catch (e: any) {
        _error = e;
        db.set_log(time, user.id, "error", _error, query, http_info);
    }
    return {
        error: _error,
        data: { user: result },
    };
}
