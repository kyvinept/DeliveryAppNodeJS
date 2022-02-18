declare namespace Express {
  export interface DecodedUser {
    id: string;
    email: string;
    role: string;
  }

  export interface Request {
    user: DecodedUser;
  }
}
