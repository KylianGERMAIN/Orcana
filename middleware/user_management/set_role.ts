import { Database } from "../../helpers/database/database";
import { update_user } from "../../helpers/database/user_request";
import { ErrorResponse } from "../../helpers/interface/error_interface";
import { HttpInfo, QueryContent } from "../../helpers/interface/log_interface";
import { JWT, User } from "../../helpers/interface/user_interface";
import { RequestContext, Token } from "../../helpers/utils";
import { User_management } from "./user_management_class/user_management";

export async function set_role(context: any, id: string, role: string) {
    const user: User = {
        email: "",
        username: "",
        password: "",
        role: "",
        id: "",
    };
    const toUser: User = {
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
            const userIn: any = await db.find_user_with_id(
                user_management.user
            );
            user_management.user.role = userIn.role;
            toUser.email = await (await db.find_user_with_id(toUser)).email;
            await user_management.compare_role(
                toUser.role ? toUser.role : "undefined"
            );
            await update_user({ email: toUser.email }, { role: toUser.role });
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
