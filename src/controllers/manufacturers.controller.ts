import type { Request, Response, NextFunction } from 'express';
import db from '../db/knex';
import { ManufacturerOutputSchema } from '../schemas/products/manufacturers.dto';
import { ErrorHandler } from '../exception/db-exception';

const transformManufacturer = (data: any) =>
  ManufacturerOutputSchema.transform((data) => ({
    uuid: data.uuid,
    manufacturerId: data.manufacturerId,
    name: data.name,
    description: data.description ?? '',
    accessLevel: data.accessLevel,
    updatedBy: data.updatedBy,
    updatedAt: data.updatedAt,
    createdBy: data.createdBy,
    createdAt: data.createdAt,
  })).parse(data);

export const createManufacturer = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const parsedData = request.body;

    console.log(`\n📄 Parsed Data: ${JSON.stringify(parsedData, null, 2)}`);

    const result = await db('manufacturers')
      .returning(['manufacturer_id', 'uuid'])
      .insert(parsedData);

    return response.status(201).send({ result });
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return new ErrorHandler(error).sendResponse(response);
  }
};

export const readManufacturers = async (
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const raw = await db.select('*').from('manufacturers').where({ is_deleted: false });

    const manufacturers = raw.map(transformManufacturer);

    return response.send(manufacturers);
  } catch (error) {
    console.error(`[READ MANUFACTURER ERROR]: ${JSON.stringify(error, null, 2)}`);
    return next(new Error('Internal Server Error'));
  }
};

export const readManufacturerByResourceId = async (
  request: Request,
  response: Response
) => {
  const { resourceId } = request;

  try {
    const query = db
      .select('*')
      .from('manufacturers')
      .where(
        typeof resourceId === 'number'
          ? { manufacturer_id: resourceId }
          : { uuid: resourceId }
      )
      .first();

    const rawResponse = await query;
    const manufacturer = transformManufacturer(rawResponse);

    return response.status(200).send({ items: manufacturer });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .send({ error: 'An error occurred while fetching the catalog category.' });
  }
};

export const updateManufacturer = async (request: Request, response: Response) => {
  const { resourceId } = request;
  const parsedData = request.body;

  try {
    const result = await db('manufacturers')
      .where({ manufacturer_id: resourceId })
      .update(parsedData);

    console.log(`\n📄 Updated Data: ${JSON.stringify(result, null, 2)}`);

    return response.status(204).send();
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return new ErrorHandler(error).sendResponse(response);
  }
};

// soft delete
export const deleteManufacturer = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { resourceId } = request;

  try {
    const result = await db('manufacturers')
      .where(
        typeof resourceId === 'number'
          ? { manufacturer_id: resourceId }
          : { uuid: resourceId }
      )
      .update({ is_deleted: true })
      .returning(['manufacturer_id', 'uuid']);

    return response.status(200).send({ result });
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return next(new Error('Internal Server Error'));
  }
};
