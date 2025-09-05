import express, { Express, NextFunction, Request, Response } from 'express';
import { PORT } from './secrets';
import rootRouter from './routes';
import { PrismaClient } from './generated/prisma';
import { errorMiddleware } from './middlewares/errors';
import ar from 'zod/v4/locales/ar.js';
import { SignUpSchema } from './schema/users';
const app: Express = express();
app.use(express.json());

//logging every request
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`➡️ ${req.method} ${req.url}`);
    next();
});

app.use('/api', rootRouter);

export const prismaClient = new PrismaClient({
    log: ['query']
});

app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log('server on the port: ' + PORT);
});