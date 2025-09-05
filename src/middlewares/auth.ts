import { ErrorCode, HttpException } from "../exceptions/root";
import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorizedException";
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../secrets";
import { BadRequestException } from "../exceptions/badRequestException";
import { prismaClient } from "..";
import { User } from "../generated/prisma";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    //1. extract token from header
    const token = req.headers.authorization;
    //2. if no token => throw Unauthorized exception
    if (!token)
        next(new UnauthorizedException("unauthorized", ErrorCode.UNAUTHORIZED));
    //3. if token is present, verify it and extract the payload and get user from it
    try {
        const payload = jwt.verify(token!, JWT_SECRET) as any;
        const user = await prismaClient.user.findFirst({ where: { id: payload.userId } })
        if (!user) {
            next(new UnauthorizedException("unauthorized", ErrorCode.UNAUTHORIZED));
        }
        //4. attach user to the current request object
        req.user = user!;
        next();
    } catch (error) {
        next(new BadRequestException("token not valid", ErrorCode.TOkEN_NOT_VALID));
    }
}
export default authMiddleware;