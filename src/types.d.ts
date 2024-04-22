import { Request } from 'express';

export {};

declare global {
  namespace Express {
    interface Request {
      user: string;
      access_level: number;
      resourceId: number | string;
    }
  }
}
