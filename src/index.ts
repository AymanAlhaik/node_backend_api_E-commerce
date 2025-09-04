import express, { Express, NextFunction, Request, Response } from 'express';
import { PORT } from './secrets';
import rootRouter from './routes';
import { PrismaClient } from './generated/prisma';
const app: Express = express();
app.use(express.json());

//logging every request
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`➡️ ${req.method} ${req.url}`);
    next();
});

app.get('/hi', (req, res) => {
    res.send({ message: "hi" });
});
app.use('/api', rootRouter);
console.log("in main");
export const prismaClient = new PrismaClient({
    log: ['query']
});
app.listen(PORT, () => {
    console.log('server on the port: ' + PORT);
});