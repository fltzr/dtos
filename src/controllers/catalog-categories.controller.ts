import type { Request, Response, NextFunction } from 'express';
import db from '../db/knex';
import { CatalogCategoryOutputSchema } from '../schemas/products/catalog-category.dto';
import { HttpStatus } from '../constants/http-status';

const transformCatalogCategory = (data: any) =>
  CatalogCategoryOutputSchema.transform((data) => ({
    id: data.catalogCategoryId,
    uuid: data.uuid,
    name: data.name,
    description: data.description,
  })).parse(data);

export const createCatalogCategory = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { catalog_category_id, uuid, ...parsedData } = request.body;
    console.info(`📄 Parsed Data: ${JSON.stringify(parsedData, null, 2)}`);

    const result = await db('catalog_categories')
      .returning(['catalog_category_id', 'uuid'])
      .insert(parsedData);

    return response.status(HttpStatus.CREATED).send({ result });
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return next(error);
  }
};

export const readCatalogCategories = async (
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const rawCategories = await db
      .select('*')
      .from('catalog_categories')
      .where({ is_deleted: false });

    const catalogCategories = rawCategories.map(transformCatalogCategory);

    return response.send({
      items: catalogCategories,
      totalCount: catalogCategories.length,
    });
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return next(error);
  }
};

export const readCatalogCategoriesByResourceId = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { resourceId } = request.params;

  try {
    const categoriesQuery = db
      .select('*')
      .from('catalog_categories')
      .where(
        typeof resourceId === 'number'
          ? { catalog_category_id: resourceId }
          : { uuid: resourceId }
      )
      .first();

    const rawResponse = await categoriesQuery;
    const catalogCategory = transformCatalogCategory(rawResponse);

    return response.status(HttpStatus.OK).send({ items: catalogCategory });
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return next(error);
  }
};

export const updateCatalogCategory = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { resourceId } = request.params;
  const parsedData = request.body;

  try {
    await db.transaction(async (trx) => {
      const result = await trx('catalog_categories')
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

export const deleteCatalogCategory = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { resourceId } = request.params;

  try {
    await db.transaction(async (trx) => {
      const result = await trx('catalog_categories')
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
