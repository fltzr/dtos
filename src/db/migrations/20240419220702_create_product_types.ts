import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('product_types', (table) => {
    table.increments('product_type_id').primary();
    table.uuid('uuid').defaultTo(knex.fn.uuid()).unique(),
      table.string('name').notNullable();
    table.string('description').checkLength('<', 500).nullable();
    table.boolean('is_deleted').defaultTo(false);
    table.string('access_level').notNullable();
    table.string('created_by').notNullable();
    table.dateTime('created_at').notNullable();
    table.string('updated_by').notNullable();
    table.dateTime('updated_at').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('product_types');
}
