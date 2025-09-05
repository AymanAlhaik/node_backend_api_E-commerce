import { Router } from "express";
import { login, signup } from "../controllers/auth";
import { errorHandler } from "../errorHandler";
import { validate } from "../middlewares/validate";
import { SignUpSchema } from "../schema/users";
const authRoutes:Router = Router();

authRoutes.post('/login', errorHandler(login));
authRoutes.post('/signup',validate(SignUpSchema),  errorHandler(signup));
export default authRoutes;