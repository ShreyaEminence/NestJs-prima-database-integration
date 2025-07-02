import { JwtPayload } from 'jsonwebtoken';
interface userPayload extends JwtPayload {
  id: string;
  name: string;
  email: string;
}
declare module 'express' {
  export interface Request {
    user?: userPayload;
  }
}
