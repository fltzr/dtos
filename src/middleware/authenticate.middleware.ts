import type { Request, Response, NextFunction } from 'express';

export const authenticate = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const session = { user: 'JOSH' };

  if (session.user) {
    request.user = session.user;
    return next();
  }

  return response.status(401).send({ error: 'Unauthorized' });
};
