import { Router } from "express";
import authRoutes from "./auth";
const rootRouter:Router = Router();
rootRouter.use('/auth', authRoutes);
console.log("in authRoutes");
export default rootRouter;