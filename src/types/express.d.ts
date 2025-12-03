import { User } from "src/generated/client/client";

declare module 'express-serve-static-core' {
  interface Request {
    user?: User | any; 
  }
}
