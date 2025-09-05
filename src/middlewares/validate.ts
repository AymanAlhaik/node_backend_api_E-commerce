// middlewares/validate.ts
import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { UnprocessableEntity } from "../exceptions/validation";
import { ErrorCode } from "../exceptions/root";

export const validate = (schema: ZodSchema):any =>
  (req: Request, res: Response, next: NextFunction):any => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        errors[err.path.join(".")] = err.message;
      });

      throw new UnprocessableEntity(errors, "Validation failed", ErrorCode.UNPROCESSABLE_ENTITY);
    }

    req.body = result.data;
    next();
  };