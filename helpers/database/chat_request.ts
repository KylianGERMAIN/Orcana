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
}

export async function get_chat(_receiver_id: any) {
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
