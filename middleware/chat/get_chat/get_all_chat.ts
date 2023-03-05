import { ErrorResponse } from "../../../helpers/interface/error_interface";
import {
    HttpInfo,
    QueryContent,
} from "../../../helpers/interface/log_interface";
import { JWT } from "../../../helpers/interface/user_interface";
import { RequestContext, Token } from "../../../helpers/utils";
import { Database } from "../../../helpers/database/database";
import { Chat } from "../chat_class/chat";

export async function get_all_chat(context: any) {
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
    const chat_class = new Chat({
        id: "",
        message: "",
        receiver_id: "",
        sender_id: "",
    });

    try {
        RequestContext.check_operation_name(context.body.operationName);
        const token: JWT = (await Token.decode_token(
            context.headers.authorization,
            process.env.ACCESS_TOKEN_SECRET as string
        )) as unknown as JWT;
        if (token) {
            chat_class._chat.sender_id = token.payload.id;
            chat_class._chats = await db.get_all_chat(token.payload.id);
            db.set_log(
                time,
                chat_class._chat.sender_id,
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
            chat_class._chat.sender_id,
            "error",
            _error,
            query,
            http_info
        );
    }
    return {
        error: _error,
        chats: chat_class._chats,
    };
}
