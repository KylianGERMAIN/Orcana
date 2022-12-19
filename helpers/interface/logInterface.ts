export interface QueryContent {
  operationName: string;
  query: string;
}

export interface HttpInfo {
  status: string;
  url: string;
  ip: string;
  method: string;
}
