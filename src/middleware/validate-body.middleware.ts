import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

type Operation = 'CREATE' | 'UPDATE';

export const validateBody =
  (schema: z.ZodSchema, operation: Operation) =>
  (request: Request, response: Response, next: NextFunction) => {
    try {
      console.log(
        `\n🔖 request.body BEFORE validation: ${JSON.stringify(request.body, null, 2)}`
      );

      const validatedData = schema.parse(request.body);

      const meta = {
        ...(operation === 'CREATE'
          ? { created_by: request.user, updated_by: request.user }
          : { updated_by: request.user }),
        ...(operation === 'UPDATE' ? { updated_by: request.user } : {}),
      };

      request.body = {
        ...validatedData,
        ...meta,
      };

      console.log(
        `\n🔖 request.body AFTER validation: ${JSON.stringify(request.body, null, 2)}`
      );

      return next();
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      return next(new Error('Internal Server Error'));
    }
  };
