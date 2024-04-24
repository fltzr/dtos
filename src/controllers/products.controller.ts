import type { Request, Response, NextFunction } from 'express';
import db from '../db/knex';

export const readProductTypes = async (
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const query = db('products')
      .select(
        'products.product_id',
        'products.name as product_name',
        'products.description as product_description',
        'catalog_categories.name as category_name',
        'manufacturers.name as manufacturer_name',
        'product_types.name as product_type_name',
        'products.created_at',
        'products.updated_at'
      )
      .join(
        'catalog_categories',
        'products.catalog_category_id',
        '=',
        'catalog_categories.catalog_category_id'
      )
      .join(
        'manufacturers',
        'products.manufacturer_id',
        '=',
        'manufacturers.manufacturer_id'
      )
      .join(
        'product_types',
        'products.product_type_id',
        '=',
        'product_types.product_type_id'
      )
      .where('products.is_deleted', false);

    const data = await query;

    console.log(`Response: ${JSON.stringify(data, null 2)}`)

    return response.send(productTypes);
  } catch (error) {
    console.error(`[READ PRODUCTTYPE ERROR]: ${JSON.stringify(error, null, 2)}`);
    return next(new Error('Internal Server Error'));
  }
};
