import { Router } from "express";
import { login, me, signup } from "../controllers/auth";
import { errorHandler } from "../errorHandler";
import { validate } from "../middlewares/validate";
import { SignUpSchema } from "../schema/users";
import authMiddleware from "../middlewares/auth";
const authRoutes: Router = Router();

authRoutes.post('/login', errorHandler(login));
authRoutes.post('/signup', validate(SignUpSchema), errorHandler(signup));
authRoutes.get('/me', [authMiddleware], errorHandler(me));
export default authRoutes