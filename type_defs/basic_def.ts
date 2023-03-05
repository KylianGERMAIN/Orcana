const basic_response = `#graphql
  type Error {
    message: String
  }

  type basic_response {
    error: Error
  }

  type pagination {
    page: Int
    page_size: Int
    page_count: Int
    total: Int
  }
`;

const basic_query = `#graphql
    type Query {
        default_post: String
    }
`;

export const Basic = [basic_response, basic_query];
