import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodType } from "zod";

export function validateQuery<T extends ZodType>(schema: T) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      next(result.error);
      return;
    }

    req.query = result.data as Request["query"];
    next();
  };
}

export function validateParams<T extends ZodType>(schema: T) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      next(result.error);
      return;
    }

    req.params = result.data as Request["params"];
    next();
  };
}

export function validateBody<T extends ZodType>(schema: T) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      next(result.error);
      return;
    }

    req.body = result.data;
    next();
  };
}

export function isZodError(error: unknown): error is ZodError {
  return error instanceof ZodError;
}
