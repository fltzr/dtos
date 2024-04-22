import { Knex } from 'knex';

const TABLE_NAME = 'product_types';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del();

  // Inserts seed entries
  await knex(TABLE_NAME).insert([
    {
      product_type_id: 1,
      name: 'Macbook Air M2',
      is_deleted: false,
      access_level: 1,
      created_by: 'seed',
      created_at: new Date(),
      updated_by: 'seed',
      updated_at: new Date(),
    },
    {
      product_type_id: 2,
      name: 'Intel i7 Chip',
      is_deleted: false,
      access_level: 1,
      created_by: 'seed',
      created_at: new Date(),
      updated_by: 'seed',
      updated_at: new Date(),
    },
    {
      product_type_id: 3,
      name: 'iPhone',
      is_deleted: false,
      access_level: 1,
      created_by: 'seed',
      created_at: new Date(),
      updated_by: 'seed',
      updated_at: new Date(),
    },
  ]);
}
