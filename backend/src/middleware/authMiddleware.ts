import { CustomError } from 'common/error/CustomError';
import { NextFunction, Request, Response } from 'express';
import Token from '../utils/jwt';

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    throw new CustomError('Invalid token format', 401);
  }

  const token = authorizationHeader.split(' ')[1];

  const tokenInstance = new Token();
  const decoded = tokenInstance.validateToken(token);

  if (decoded) {
    req.company = {
      id: decoded,
    };
  }

  next();
};
