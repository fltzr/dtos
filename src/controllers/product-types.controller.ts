import type { Request, Response, NextFunction } from 'express';
import db from '../db/knex';
import { ProductTypeOutputSchema } from '../schemas/products/product-types.dto';
import { ErrorHandler } from '../exception/db-exception';

const transformProductType = (data: any) =>
  ProductTypeOutputSchema.transform((data) => ({
    productTypeId: data.productTypeId,
    name: data.name,
    description: data.description ?? '',
  })).parse(data);

export const createProductType = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const parsedData = request.body;

    console.log(`\n📄 Parsed Data: ${JSON.stringify(parsedData, null, 2)}`);

    const result = await db('product_types')
      .returning(['product_type_id', 'uuid'])
      .insert(parsedData);

    return response.status(201).send({ result });
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return new ErrorHandler(error).sendResponse(response);
  }
};

export const readProductTypes = async (
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const raw = await db.select('*').from('product_types').where({ is_deleted: false });

    const productTypes = raw.map(transformProductType);

    return response.send(productTypes);
  } catch (error) {
    console.error(`[READ PRODUCTTYPE ERROR]: ${JSON.stringify(error, null, 2)}`);
    return next(new Error('Internal Server Error'));
  }
};

export const readProductTypeByResourceId = async (
  request: Request,
  response: Response
) => {
  const { resourceId } = request;

  try {
    const query = db
      .select('*')
      .from('product_types')
      .where(
        typeof resourceId === 'number'
          ? { product_type_id: resourceId }
          : { uuid: resourceId }
      )
      .first();

    const rawResponse = await query;
    const productType = transformProductType(rawResponse);

    return response.status(200).send({ items: productType });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .send({ error: 'An error occurred while fetching the catalog category.' });
  }
};

export const updateProductType = async (request: Request, response: Response) => {
  const { resourceId } = request;
  const parsedData = request.body;

  try {
    const result = await db('product_types')
      .where({ product_type_id: resourceId })
      .update(parsedData);

    console.log(`\n📄 Updated Data: ${JSON.stringify(result, null, 2)}`);

    return response.status(204).send();
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return new ErrorHandler(error).sendResponse(response);
  }
};

// soft delete
export const deleteProductType = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { resourceId } = request;

  try {
    const result = await db('product_types')
      .where(
        typeof resourceId === 'number'
          ? { product_type_id: resourceId }
          : { uuid: resourceId }
      )
      .update({ is_deleted: true })
      .returning(['product_type_id', 'uuid']);

    return response.status(200).send({ result });
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return next(new Error('Internal Server Error'));
  }
};
