import { Chat } from "../helpers/interface/chat_interface";
import { create_chat } from "../middleware/chat/chat";

export const chat_mutation = {
    create_chat: async (
        parent: never,
        { receiver_id, message }: Chat,
        context: any
    ) => create_chat(receiver_id, message, context),
};

export const chat_query = {};
