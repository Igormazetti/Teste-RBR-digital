import { CustomError } from 'common/error/CustomError';
import { NextFunction, Request, Response } from 'express';

export function errorInterceptor(
  err: Error,
  request: Request,
  response: Response,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  _next: NextFunction,
) {
  if (err instanceof CustomError) {
    return response.status(err.status).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Interval server error = ${err.message}`,
  });
}
