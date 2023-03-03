import { ErrorResponse } from "../../../helpers/interface/error_interface";
import {
    HttpInfo,
    QueryContent,
} from "../../../helpers/interface/log_interface";
import { JWT } from "../../../helpers/interface/user_interface";
import { RequestContext, Token } from "../../../helpers/utils";
import { Database } from "../../../helpers/database/database";
import { Chat } from "../chat_class/chat";

export async function create_chat(
    receiver_id: string,
    message: string,
    context: any
) {
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
        sender_id: "",
        receiver_id: receiver_id,
        message: message,
        id: "",
    });

    try {
        RequestContext.check_operation_name(context.body.operationName);
        const token: JWT = (await Token.decode_token(
            context.headers.authorization,
            process.env.ACCESS_TOKEN_SECRET as string
        )) as unknown as JWT;
        if (token) {
            chat_class._chat.sender_id = token.payload.id;
            await chat_class.empty_chat(chat_class._chat);
            chat_class._chat.id = (
                await db.create_chat(chat_class._chat)
            )._id.toString();
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
        receiver_id: chat_class._chat.receiver_id,
        message: chat_class._chat.message,
        id: chat_class._chat.id,
    };
}
