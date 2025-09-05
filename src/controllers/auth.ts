import { NextFunction, Request, Response } from "express"
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../secrets";
import { ErrorCode } from "../exceptions/root";
import { UnprocessableEntity } from "../exceptions/validation";
import { SignUpSchema } from "../schema/users";
import { BadRequestException } from "../exceptions/badRequestException";
import { NotFoundException } from "../exceptions/notFoundException";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    //checking user if exists
    let user = await prismaClient.user.findFirst({ where: { email } });
    if (!user) {
       throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND)
    }

    if (!compareSync(password, user.password)) {
        throw new BadRequestException("Incorrect password", ErrorCode.INCORRECT_PASSWORD);
    }
    const token = jwt.sign({
        userId: user.id,

    }, JWT_SECRET);

    res.json({ user, token });
}
export const signup = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, name } = req.body
    //checking user if exists
    let user = await prismaClient.user.findFirst({ where: { email } });
    if (user) {
       throw new BadRequestException('User already exists', ErrorCode.USER_ALREADY_EXISTS);
    }
    user = await prismaClient.user.create({
        data: {
            name,
            email,
            password: hashSync(password, 10)
        }
    });
    res.json(user);
}

export const me = async (req: Request, res: Response) => {
    res.send(req?.user);
}
