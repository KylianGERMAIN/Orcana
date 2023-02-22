import { Chat } from "../interface/chat_interface";
import { chat_model } from "../models/chat_model";

export async function create_chat(chat: Chat) {
    const log = await new chat_model({
        timestamp: new Date().toISOString(),
        sender_id: chat.sender_id,
        receiver_id: chat.receiver_id,
        message: chat.message,
    });
    await log.save();
}
