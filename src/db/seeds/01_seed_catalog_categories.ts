import { Knex } from 'knex';

const TABLE_NAME = 'catalog_categories';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del();

  // Inserts seed entries
  await knex(TABLE_NAME).insert([
    {
      catalog_category_id: 1,
      name: 'Electronics',
      description: 'Electronic items',
      is_deleted: false,
      access_level: 1,
      created_by: 'seed',
      created_at: new Date(),
      updated_by: 'seed',
      updated_at: new Date(),
    },
    {
      catalog_category_id: 2,
      name: 'Software',
      description: 'Software category',
      is_deleted: false,
      access_level: 1,
      created_by: 'seed',
      created_at: new Date(),
      updated_by: 'seed',
      updated_at: new Date(),
    },
    {
      catalog_category_id: 3,
      name: 'Hardware',
      description: 'Hardware category',
      is_deleted: false,
      access_level: 1,
      created_by: 'seed',
      created_at: new Date(),
      updated_by: 'seed',
      updated_at: new Date(),
    },
  ]);
}
