import {
    find_user_with_id,
    update_user,
} from "../../helpers/database/userRequest";
import { ErrorResponse } from "../../helpers/interface/errorInterface";
import { HttpInfo, QueryContent } from "../../helpers/interface/logInterface";
import { JWT, User } from "../../helpers/interface/userInterface";
import { Token } from "../../helpers/utils";
import { compare_role } from "../../helpers/validator/role";
import { set_log } from "../log/set_log";

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

    try {
        const token: JWT = (await Token.decode_refresh_token(
            context.headers.authorization,
            process.env.ACCESS_TOKEN_SECRET as string
        )) as JWT;
        if (token) {
            user.id = token.payload.id;
            const userIn: any = await find_user_with_id(user);
            user.role = userIn.role;
            const userOut: any = await find_user_with_id(toUser);
            toUser.email = userOut.email;
            await compare_role(
                user.role ? user.role : "undefined",
                toUser.role ? toUser.role : "undefined"
            );
            await update_user({ email: toUser.email }, { role: toUser.role });
            set_log(time, user.id, "info", _error, query, http_info);
        }
    } catch (e: any) {
        _error = e;
        set_log(time, user.id, "error", _error, query, http_info);
    }
    return {
        error: _error,
    };
}
