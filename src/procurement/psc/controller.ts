import type { NextFunction, Request, Response } from 'express';
import { fetchPD } from './service';

export const getList = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const p = await fetchPD();

    if (p) {
      return response.send({
        items: p,
        totalCount: p.length,
      });
    }

    return response.status(400).send({
      items: [],
      totalCount: null,
      message: 'Unable to fetch p.',
    });
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return next(new Error('Internal Server Error'));
  }
};
