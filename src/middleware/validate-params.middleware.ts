import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const idParamSchema = z.coerce.number().int().positive();
const uuidParamSchema = z.string().uuid();

export const validateParams = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const rawIdParam = request.params.id;

  const parsedResourceId = idParamSchema.safeParse(rawIdParam);

  parsedResourceId.success &&
    console.log(
      `\n🔖 Parsed Resource ID: ${JSON.stringify(parsedResourceId.data, null, 2)}`
    );

  if (parsedResourceId.success) {
    request.resourceId = parsedResourceId.data;
    return next();
  }

  const parsedResourceUUID = uuidParamSchema.safeParse(rawIdParam);

  console.log(
    `\n🔖 Parsed Resource UUID: ${JSON.stringify(parsedResourceUUID, null, 2)}`
  );

  if (parsedResourceUUID.success) {
    request.resourceId = parsedResourceUUID.data;
    return next();
  }

  return response.status(400).send({ error: 'Invalid resource ID' });
};
