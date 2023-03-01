import { ErrorResponse } from "../../helpers/interface/error_interface";
import { HttpInfo, QueryContent } from "../../helpers/interface/log_interface";
import { JWT } from "../../helpers/interface/user_interface";
import { RequestContext, Token } from "../../helpers/utils";
import { Database } from "../../helpers/database/database";
import { IChat } from "../../helpers/interface/chat_interface";

export async function get_chat(context: any) {
    let _error: ErrorResponse = {
        message: "",
        extensions: {
            status: 0,
            error: "",
            field: "",
        },
    };

    let chats: IChat[] = [];

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

    try {
        RequestContext.check_operation_name(context.body.operationName);
        const token: JWT = (await Token.decode_token(
            context.headers.authorization,
            process.env.ACCESS_TOKEN_SECRET as string
        )) as unknown as JWT;
        if (token) {
            chats = await db.get_chat(token.payload.id);
            db.set_log(
                time,
                token.payload.id,
                "info",
                _error,
                query,
                http_info
            );
        }
    } catch (e: any) {
        _error = e;
        db.set_log(time, "", "error", _error, query, http_info);
    }
    return {
        error: _error,
        chats: chats,
    };
}
