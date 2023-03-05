import { IChat } from "../helpers/interface/chat_interface";
import { create_chat } from "../middleware/chat/create-chat/create_chat";
import { delete_chat } from "../middleware/chat/delete_chat/delete_chat";
import { get_chat } from "../middleware/chat/get_chat/get_chat";

export const chat_mutation = {
    create_chat: async (
        parent: never,
        { receiver_id, message }: IChat,
        context: any
    ) => create_chat(receiver_id, message, context),

    delete_chat: async (parent: never, { id }: any, context: any) =>
        delete_chat(id, context),

    get_chat: async (parent: never, { page }: never, context: any) =>
        get_chat(context, page),
};

// export const chat_query = {
//     get_chat: async (parent: never, values: never, context: any) =>
//         get_chat(context),
// };
