import type { Request, Response, NextFunction } from 'express';
import db from '../db/knex';
import { CCOutputSchema } from '../schemas/p/cc.dto';
import { HttpStatus } from '../constants/http-status';

const transformCC = (data: any) =>
  CCOutputSchema.transform((data) => ({
    id: data.cCId,
    uuid: data.uuid,
    name: data.name,
    description: data.description,
  })).parse(data);

export const createCC = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { catalog_category_id, uuid, ...parsedData } = request.body;
    console.info(`📄 Parsed Data: ${JSON.stringify(parsedData, null, 2)}`);

    const result = await db('cc')
      .returning(['catalog_category_id', 'uuid'])
      .insert(parsedData);

    return response.status(HttpStatus.CREATED).send({ result });
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return next(error);
  }
};

export const readCC = async (
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const rawCategories = await db.select('*').from('cc').where({ is_deleted: false });

    const cC = rawCategories.map(transformCC);

    return response.send({
      items: cC,
      totalCount: cC.length,
    });
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return next(error);
  }
};

export const readCCByResourceId = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { resourceId } = request.params;

  try {
    const categoriesQuery = db
      .select('*')
      .from('cc')
      .where(
        typeof resourceId === 'number'
          ? { catalog_category_id: resourceId }
          : { uuid: resourceId }
      )
      .first();

    const rawResponse = await categoriesQuery;
    const cC = transformCC(rawResponse);

    return response.status(HttpStatus.OK).send({ items: cC });
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return next(error);
  }
};

export const updateCC = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { resourceId } = request.params;
  const parsedData = request.body;

  try {
    await db.transaction(async (trx) => {
      const result = await trx('cc')
        .where({ catalog_category_id: resourceId })
        .update(parsedData);

      console.info(`📄 Updated Data: ${JSON.stringify(result, null, 2)}`);
    });

    return response.status(HttpStatus.NO_CONTENT).send();
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return next(error);
  }
};

export const deleteCC = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { resourceId } = request.params;

  try {
    await db.transaction(async (trx) => {
      const result = await trx('cc')
        .where(
          typeof resourceId === 'number'
            ? { catalog_category_id: resourceId }
            : { uuid: resourceId }
        )
        .update({ is_deleted: true })
        .returning(['catalog_category_id', 'uuid']);

      return response.status(HttpStatus.OK).send({ result });
    });
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return next(error);
  }
};
