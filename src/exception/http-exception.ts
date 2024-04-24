import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../constants/http-status';

export class ErrorHandler {
  public static sendError = (
    error: any,
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    console.error(JSON.stringify(error, null, 2));

    response.status(error.status || HttpStatus.BAD_REQUEST).send({
      success: false,
      message: error.message || 'Server error.',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  };
}
