const chat_response = `#graphql
    type create_chat_response {
        receiver_id: String
        message: String
        error: Error
    }

    type chat {
      messages: String
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
  }
`;

const chat_query = `#graphql
    type Query {
        get_chat:get_chat_response
    }
`;

// const statistic_subscription = `#graphql
//   type Subscription {
//     numberIncremented: Int
//   }
// `;

export const chat = [chat_response, chat_mutation, chat_query];
