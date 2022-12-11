export interface User {
  email: string;
  username: string;
  password: string;
}

export interface JWT {
  header: {
    alg: string;
    typ: string;
  };
  payload: {
    email: string;
    iat: number;
    exp: number;
  };
  signature: string;
}