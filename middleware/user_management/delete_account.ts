import { ErrorResponse } from "../../helpers/interface/error_interface";
import { JWT, IUser } from "../../helpers/interface/user_interface";
import { RequestContext, Token } from "../../helpers/utils";
import { HttpInfo, QueryContent } from "../../helpers/interface/log_interface";
import { User_management } from "./user_management_class/user_management";
import { Database } from "../../helpers/database/database";

export async function delete_account(context: any) {
    const user: IUser = {
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
    const db = new Database();

    try {
        RequestContext.check_operation_name(context.body.operationName);
        const token: JWT = (await Token.decode_token(
            context.headers.authorization,
            process.env.ACCESS_TOKEN_SECRET as string
        )) as JWT;
        if (token) {
            user_management.user.id = token.payload.id;
            await db.delete_user({ _id: user_management.user.id });
            db.set_log(
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
        db.set_log(
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
