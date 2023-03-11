import { ErrorResponse } from "../../../helpers/interface/error_interface";
import {
    HttpInfo,
    QueryContent,
} from "../../../helpers/interface/log_interface";
import { JWT } from "../../../helpers/interface/user_interface";
import { RequestContext, Token } from "../../../helpers/utils";
import { Database } from "../../../helpers/database/database";
import { Chat } from "../chat_class/chat";
import { chat_model } from "../../../helpers/models/chat_model";

export async function get_chat(context: any, _page: number, _width: string) {
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

    let _total = 0;
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
            await chat_class.pagination_sup_zero(_page);
            chat_class._chat.sender_id = token.payload.id;
            if (_page && _width) {
                chat_class._chats = await db.get_chat_only_with(
                    token.payload.id,
                    _page,
                    _width
                );
                _total = await chat_model.count({
                    $or: [
                        { receiver_id: token.payload.id, sender_id: _width },
                        { receiver_id: _width, sender_id: token.payload.id },
                    ],
                });
            } else {
                chat_class._chats = await db.get_chat(token.payload.id, _page);
                _total = await chat_model.count({
                    receiver_id: token.payload.id,
                });
            }

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
        pagination: {
            page: _page,
            page_size: chat_class._chats.length,
            page_count: Math.ceil(_total / 100),
            total: _total,
        },
    };
}
