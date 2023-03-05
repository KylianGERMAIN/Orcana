import { GraphQLError } from "graphql";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { CustomErrorMessage } from "../error/error";
import { IChat } from "../interface/chat_interface";
import { chat_model } from "../models/chat_model";

export async function create_chat(chat: IChat) {
    const log = await new chat_model({
        timestamp: new Date().toISOString(),
        sender_id: chat.sender_id,
        receiver_id: chat.receiver_id,
        message: chat.message,
    });
    await log.save();
    const res_chat: IChat = {
        sender_id: log.sender_id,
        date: log.timestamp,
        receiver_id: log.receiver_id || "",
        message: log.message || "",
        id: log.id,
    };
    return res_chat;
}

export async function get_chat(_receiver_id: string, page: number) {
    const chats: IChat[] = [];
    const res = await chat_model
        .find({ receiver_id: _receiver_id })
        .sort({ timestamp: -1 })
        .skip(100 * (page - 1))
        .limit(100)
        .clone();
    for (let i = 0; i != res.length; i++) {
        const chat: IChat = {
            message: res[i].message || "",
            receiver_id: _receiver_id,
            sender_id: res[i].sender_id || "",
            date: res[i].timestamp || "",
            id: res[i].id || "",
        };
        chats.push(chat);
    }
    return chats;
}

export async function get_all_chat(_receiver_id: string) {
    const chats: IChat[] = [];
    const res = await chat_model
        .find({ receiver_id: _receiver_id })
        .sort({ timestamp: -1 })
        .clone();
    for (let i = 0; i != res.length; i++) {
        const chat: IChat = {
            message: res[i].message || "",
            receiver_id: _receiver_id,
            sender_id: res[i].sender_id || "",
            date: res[i].timestamp || "",
            id: res[i].id || "",
        };
        chats.push(chat);
    }
    return chats;
}

export async function delete_chat(_sender_id: string, _id: string) {
    await chat_model
        .deleteOne({ _id: _id }, function (err: any) {
            if (err) {
                throw new GraphQLError(
                    CustomErrorMessage.DELETE_CHAT_DATABASE,
                    {
                        extensions: {
                            status: StatusCodes.INTERNAL_SERVER_ERROR,
                            error: ReasonPhrases.INTERNAL_SERVER_ERROR,
                        },
                    }
                );
            }
        })
        .clone();
}
