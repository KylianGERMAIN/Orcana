const basic_response = `#graphql
  type Error {
    message: String
  }

  type basic_response {
    error: Error
  }
`;

const basic_query = `#graphql
    type Query {
        default_post: String
    }
`;

export const Basic = [basic_response, basic_query];
