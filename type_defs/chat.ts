const chat_response = `#graphql
    type create_chat_response {
        receiver_id: String
        message: String
        id: String
        error: Error
    }

    type delete_chat_response {
        receiver_id: String
        message: String
        date: String
        id: String
        error: Error
    }

    type chat {
      message: String
      receiver_id: String
      sender_id: String
      date: String
      id: String
    }

    type get_chat_response {
      chats: [chat]
      error: Error
    }
`;

const chat_mutation = `#graphql
  type Mutation {
    create_chat(
      receiver_id: String
      message: String
    ): create_chat_response
    delete_chat(
      id: String
    ): basic_response
  }
`;

const chat_query = `#graphql
    type Query {
        get_chat:get_chat_response
    }
`;

const chat_subscription = `#graphql
  type Subscription {
    chat_subscription: chat
  }
`;

export const chat = [
    chat_response,
    chat_mutation,
    chat_query,
    chat_subscription,
];
