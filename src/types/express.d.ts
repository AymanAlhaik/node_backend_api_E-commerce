import expess from 'express';
import { User } from "../generated/prisma";

declare module 'express'{
    export interface Request{
        user?:User
    }
}
// import { User } from '@prisma/client'; // or your own User type
// import { Express } from 'express';
// declare global {
//   namespace Express {
//     export interface Request {
//       user?: User;
//     }
//   }
// }
