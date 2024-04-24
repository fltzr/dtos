import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('products').del();

  // Inserts seed entries
  await knex('products').insert([
    {
      product_id: 2,
      name: 'Computer',
      description: 'Description of computer',
      catalog_category_id: 2,
      manufacturer_id: 3,
      product_type_id: 2,
      created_by: 'JOSH',
      created_at: new Date(),
      updated_by: 'JOSH',
      updated_at: new Date(),
    },
    {
      product_id: 3,
      name: 'Television',
      description: 'Description of television',
      catalog_category_id: 2,
      manufacturer_id: 2,
      product_type_id: 2,
      created_by: 'JOSH',
      created_at: new Date(),
      updated_by: 'JOSH',
      updated_at: new Date(),
    },
    {
      product_id: 4,
      name: 'Fan',
      description: 'Description of fan',
      catalog_category_id: 3,
      manufacturer_id: 3,
      product_type_id: 3,
      created_by: 'JOSH',
      created_at: new Date(),
      updated_by: 'JOSH',
      updated_at: new Date(),
    },
  ]);
}
