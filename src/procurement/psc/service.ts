import db from '../../db/knex';
import { PSCSchema } from './schema';

export const fetchPD = async () => {
  const raw = await db('p')
    .select(
      'p.uuid as uuid',
      'p.description as description',
      'cc.name as categoryName',
      'ms.name as mName',
      'product_types.name as product_typeName',
      'p.created_at as createdAt',
      'p.updated_at as updatedAt'
    )
    .join('cc', 'p.catalog_category_id', '=', 'cc.catalog_category_id')
    .join('ms', 'p.m_id', '=', 'm.m_id')
    .join('product_types', 'p.product_type_id', '=', 'product_types.product_type_id')
    .where('p.is_deleted', false);

  return raw.map((p) => PSCSchema.parse(p));
};
