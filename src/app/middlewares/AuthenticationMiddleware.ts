import { Request, Response, NextFunction } from 'express';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';

import authConfig from '@config/auth';

interface Auth {
  id: number;
}

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return process.env.NODE_ENV !== 'production'
      ? res
          .status(401)
          .json({ error: { message: 'No Authentication Header provided' } })
      : res.status(401).send();

  const [, token] = authHeader.split(' ');

  try {
    const decoded = (await promisify(jwt.verify)(
      token,
      authConfig.secret,
    )) as Auth;
    req.auth = {
      userId: decoded.id,
    };

    return next();
  } catch (err) {
    return process.env.NODE_ENV !== 'production'
      ? res.status(401).json({ error: { message: err.message } })
      : res.status(401).send();
  }
};
