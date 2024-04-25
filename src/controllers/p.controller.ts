import type { Request, Response, NextFunction } from 'express';
import db from '../db/knex';

export const readP = async (
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const query = db('p')
      .select(
        'p.product_id',
        'p.name as product_name',
        'p.description as product_description',
        'cc.name as category_name',
        'ms.name as m_name',
        'product_types.name as product_type_name',
        'p.created_at',
        'p.updated_at'
      )
      .join(
        'cc',
        'p.catalog_category_id',
        '=',
        'cc.catalog_category_id'
      )
      .join('ms', 'p.m_id', '=', 'ms.m_id')
      .join('product_types', 'p.product_type_id', '=', 'product_types.product_type_id')
      .where('p.is_deleted', false);

    const data = await query;

    console.log(`Response: ${JSON.stringify(data, null, 2)}`);

    return response.send(data.map(p => ));
  } catch (error) {
    console.error(`[READ PRODUCTTYPE ERROR]: ${JSON.stringify(error, null, 2)}`);
    return next(new Error('Internal Server Error'));
  }
};
