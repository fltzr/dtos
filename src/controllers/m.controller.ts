import type { Request, Response, NextFunction } from 'express';
import db from '../db/knex';
import { MOutputSchema } from '../schemas/p/m.dto';
import { ErrorHandler } from '../exception/db-exception';

const transformM = (data: any) =>
  MOutputSchema.transform((data) => ({
    mId: data.mId,
    name: data.name,
    description: data.description ?? '',
  })).parse(data);

export const createM = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const parsedData = request.body;

    console.log(`\n📄 Parsed Data: ${JSON.stringify(parsedData, null, 2)}`);

    const result = await db('ms').returning(['m_id', 'uuid']).insert(parsedData);

    return response.status(201).send({ result });
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return new ErrorHandler(error).sendResponse(response);
  }
};

export const readMs = async (
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const raw = await db.select('*').from('ms').where({ is_deleted: false });

    const ms = raw.map(transformM);

    return response.send(ms);
  } catch (error) {
    console.error(`[READ M ERROR]: ${JSON.stringify(error, null, 2)}`);
    return next(new Error('Internal Server Error'));
  }
};

export const readMByResourceId = async (request: Request, response: Response) => {
  const { resourceId } = request;

  try {
    const query = db
      .select('*')
      .from('ms')
      .where(typeof resourceId === 'number' ? { m_id: resourceId } : { uuid: resourceId })
      .first();

    const rawResponse = await query;
    const m = transformM(rawResponse);

    return response.status(200).send({ items: m });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .send({ error: 'An error occurred while fetching the catalog category.' });
  }
};

export const updateM = async (request: Request, response: Response) => {
  const { resourceId } = request;
  const parsedData = request.body;

  try {
    const result = await db('ms').where({ m_id: resourceId }).update(parsedData);

    console.log(`\n📄 Updated Data: ${JSON.stringify(result, null, 2)}`);

    return response.status(204).send();
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return new ErrorHandler(error).sendResponse(response);
  }
};

// soft delete
export const deleteM = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { resourceId } = request;

  try {
    const result = await db('ms')
      .where(typeof resourceId === 'number' ? { m_id: resourceId } : { uuid: resourceId })
      .update({ is_deleted: true })
      .returning(['m_id', 'uuid']);

    return response.status(200).send({ result });
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return next(new Error('Internal Server Error'));
  }
};
