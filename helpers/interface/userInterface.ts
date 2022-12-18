export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  role: string;
}

export interface JWT {
  header: {
    alg: string;
    typ: string;
  };
  payload: {
    id: string;
    iat: number;
    exp: number;
  };
  signature: string;
}