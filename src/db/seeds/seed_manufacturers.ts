import { Knex } from 'knex';

const TABLE_NAME = 'manufacturers';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del();

  // Inserts seed entries
  await knex(TABLE_NAME).insert([
    {
      manufacturer_id: 1,
      name: 'Amazon',
      description: 'AWS related services',
      is_deleted: false,
      access_level: 1,
      created_by: 'seed',
      created_at: new Date(),
      updated_by: 'seed',
      updated_at: new Date(),
    },
    {
      manufacturer_id: 2,
      name: 'Apple',
      description: 'Macbook Pro devices.',
      is_deleted: false,
      access_level: 1,
      created_by: 'seed',
      created_at: new Date(),
      updated_by: 'seed',
      updated_at: new Date(),
    },
    {
      manufacturer_id: 3,
      name: 'Intel',
      description: 'Intel i7 chips.',
      is_deleted: false,
      access_level: 1,
      created_by: 'seed',
      created_at: new Date(),
      updated_by: 'seed',
      updated_at: new Date(),
    },
  ]);
}
