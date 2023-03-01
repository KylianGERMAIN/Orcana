export interface ErrorResponse {
  message: string;
  extensions: {
    status: number;
    error: string;
    field: string;
  };
}
