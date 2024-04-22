import type { Request, Response, NextFunction } from 'express';
import db from '../db/knex';
import { CatalogCategoryOutputSchema } from '../schemas/products/catalog-category.dto';
import { ErrorHandler } from '../exception/db-exception';

const transformCatalogCategory = (data: any) =>
  CatalogCategoryOutputSchema.transform((data) => ({
    uuid: data.uuid,
    catalogCategoryId: data.catalogCategoryId,
    name: data.name,
    description: data.description,
    accessLevel: data.accessLevel,
    updatedBy: data.updatedBy,
    updatedAt: data.updatedAt,
    createdBy: data.createdBy,
    createdAt: data.createdAt,
  })).parse(data);

export const createCatalogCategory = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const parsedData = request.body;

    console.log(`\n📄 Parsed Data: ${JSON.stringify(parsedData, null, 2)}`);

    const result = await db('catalog_categories')
      .returning(['catalog_category_id', 'uuid'])
      .insert(parsedData);

    return response.status(201).send({ result });
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return new ErrorHandler(error).sendResponse(response);
  }
};

export const readCatalogCategories = async (
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const raw = await db
      .select('*')
      .from('catalog_categories')
      .where({ is_deleted: false });

    const catalogCategories = raw.map(transformCatalogCategory);

    return response.send(catalogCategories);
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return next(new Error('Internal Server Error'));
  }
};

export const readCatalogCategoriesByResourceId = async (
  request: Request,
  response: Response
) => {
  const { resourceId } = request;

  try {
    const query = db
      .select('*')
      .from('catalog_categories')
      .where(
        typeof resourceId === 'number'
          ? { catalog_category_id: resourceId }
          : { uuid: resourceId }
      )
      .first();

    const rawResponse = await query;
    const catalogCategory = transformCatalogCategory(rawResponse);

    return response.status(200).send({ items: catalogCategory });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .send({ error: 'An error occurred while fetching the catalog category.' });
  }
};

export const updateCatalogCategory = async (request: Request, response: Response) => {
  const { resourceId } = request;
  const parsedData = request.body;

  try {
    const result = await db('catalog_categories')
      .where({ catalog_category_id: resourceId })
      .update(parsedData);

    console.log(`\n📄 Updated Data: ${JSON.stringify(result, null, 2)}`);

    return response.status(204).send();
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return new ErrorHandler(error).sendResponse(response);
  }
};

// soft delete
export const deleteCatalogCategory = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { resourceId } = request;

  try {
    const result = await db('catalog_categories')
      .where(
        typeof resourceId === 'number'
          ? { catalog_category_id: resourceId }
          : { uuid: resourceId }
      )
      .update({ is_deleted: true })
      .returning(['catalog_category_id', 'uuid']);

    return response.status(200).send({ result });
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return next(new Error('Internal Server Error'));
  }
};
