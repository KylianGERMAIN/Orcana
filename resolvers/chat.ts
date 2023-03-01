import { IChat } from "../helpers/interface/chat_interface";
import { create_chat } from "../middleware/chat/create_chat";
import { get_chat } from "../middleware/chat/get_chat";

export const chat_mutation = {
    create_chat: async (
        parent: never,
        { receiver_id, message }: IChat,
        context: any
    ) => create_chat(receiver_id, message, context),
};

export const chat_query = {
    get_chat: async (parent: never, values: never, context: any) =>
        get_chat(context),
};
