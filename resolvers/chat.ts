export const chat_mutation = {
    create_chat: async (
        parent: never,
        { receiver_id, message }: any,
        context: any
    ) => console.log(receiver_id, message),
};

export const chat_query = {};
